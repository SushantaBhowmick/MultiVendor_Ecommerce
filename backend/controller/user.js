const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../model/User');
const ErrorHandler = require('../utils/ErrorHandler');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.register = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const userEmail = await User.findOne({email})
    if(userEmail) {
    const fileName = req.file.filename;
    const filePath = `uploads/${fileName}`;
    fs.unlink(filePath,(err)=>{
        if(err){
            console.log(err)
            res.status(500).json({message:"deleting file"})
        }else{
            res.json({message:"file deleted successfully"})
        }
    })
        return next(new ErrorHandler("User already exists",400))
    }
    
    const fileName = req.file.filename;
    const fileUri = path.join(fileName);
    const avatar = fileUri;

    const user = {
        name:name,
        email:email,
        password:password,
        avatar
    } 
    // avatar:{
    //     public_id: "myCloud.public_id",
    //     url:" myCloud.secure_url",
    // },
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;


    const newUser = await User.create(user)  
    res.status(201).json({
        success:true,
        newUser
    })
    
})
//create activation token
const createActivationToken =(user)=>{
    return jwt.sign(user,process.env.ACTIVATION_SECRET,{
        expiresIn:"5m"
    })
}