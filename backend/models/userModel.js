const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { reset } = require("nodemon");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        maxLength:[30 ,"Name cannot exceed 30 characters"],
        minLength:[4, "Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true, "Please enter your Email"],
        unique:true,
        validate:[validator.isEmail, "Please enter valid Email"],
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minLength:[8, "Password should have at least 8 characters"],
        select:false,//when quering password should not be shown
    },
    avatar:{
        
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
        
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,



})

//event for hashing the password before saving the user
//we cannot use this inside arrow function
userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
})


//JWT token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//Compare password
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password);
}

//Forgot password - generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and add to resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}



module.exports = mongoose.model("User", userSchema);