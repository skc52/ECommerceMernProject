const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    //We passed the user id to the token..so we need to decode it from the token
    //in order to find the user who is requesting these calls
    //if the user exists then we allow him
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})  

exports.authorizedRoles = (...roles) =>{
    
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
           
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        };
        next();
    }
    
}
