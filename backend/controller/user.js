const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../model/User');
const ErrorHandler = require('../utils/ErrorHandler');
const path = require('path');

exports.register = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,avatar} = req.body;
    const userEmail = await User.findOne({email})
    if(userEmail) return next(new ErrorHandler("User already exists",400))
    
    const fileName = req.file.filename;
    const fileUri = path.join(fileName)

    const user = {
        name,
        email,
        password,
        avatar:fileUri,
    } 
    const newUser = await User.create(user)  
    res.status(201).json({
        success:true,
        newUser
    })
    
})