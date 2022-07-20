const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const cloudinary = require("cloudinary");

//Register a user
exports.registerAUser = async(req, res, next)=>{
try{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const {name, email, password} = req.body;
    const user = await User.create(
        {
            name, email, password,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
    );

    sendToken(user, 201, res);
    } catch(error){
        console.log(error);
    }
}



exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter EMail & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
})

exports.logoutUser = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token", null, {
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
})

//Forgot password
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    //Get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});//because we updated the resetPasswordToken in user schema

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n
    ${resetPasswordUrl}\n\nIf you have not requested this email then please ignore it.
    `

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Reset`,
            message
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,

        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500));
    }
});


exports.resetPassword = catchAsyncErrors(async(req, res, next)=>{
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}//check that the token has not expired
    })

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();  

    sendToken(user, 200, res);
})

// get user detail
exports.getUserDetails = catchAsyncErrors(async(req, res, next)=> {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user,
    })
})


//change user password
exports.changePassword = catchAsyncErrors(async(req, res, next)=>{
    const user =await User.findById(req.user.id).select("+password");
   
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        console.log("Here")
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    //Why are we sending token
    //this means we are logged in
    console.log(user.password);
    sendToken(user, 200, res);
})


//Update User Profile
exports.updateProfile = async (req, res, next)=>{
    try {
        const newUserData = {
            name:req.body.name,
            email:req.body.email,
    
        }
    
        //we will add cloudinary later
        if (req.body.avatar !== ""){
            const user = await User.findById(req.user.id);
            const imageId = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(imageId);
    
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder:"avatars",
                width:150,
                crop:"scale",
            });
    
            newUserData.avatar = {
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            }
        }
    
    
        const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
    
        res.status(200).json({
            success:true,
        });
    
    } catch (error) {
        console.log(error.message);
    }
    
}

//Get all users - admin
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=> {
    console.log("HERER")
    const users = await User.find();

    console.log("here")
    console.log(users);

    res.status(200).json({
        success:true,
        users,
    })
})


//Get single user - admin
exports.getUser = catchAsyncErrors(async(req, res, next)=> {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }
    res.status(200).json({
        success:true,
        user
    })
})


//Update the role of the user - admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next)=>{
    const newUserData = {
        role:req.body.role
    }

    //we will add cloudinary later
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:`User's role changed to ${req.body.role}`
    });


})



//Delete a user - admin
exports.deleteUser = catchAsyncErrors(async (req, res, next)=>{
    
    const user = await User.findById(req.params.id);
    //we will remove  cloudinary later


   if(!user){
    return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
   }
   

   const ImageId= user.avatar.public_id;
   await cloudinary.v2.uploader.destroy(ImageId);
   await user.remove();
    res.status(200).json({
        success:true,
        message:"User deleted successfully!"
    });

})


