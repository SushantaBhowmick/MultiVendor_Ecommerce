const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../model/User');
const ErrorHandler = require('../utils/ErrorHandler');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/jwtToken');

exports.register = catchAsyncErrors(async (req, res, next) => {
    try{
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email })
    if (userEmail) {
        const fileName = req.file.filename;
        const filePath = `uploads/${fileName}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: "deleting file" })
            }
        })
        return next(new ErrorHandler("User already exists", 400))
    }

    const fileName = req.file.filename;
    const fileUri = path.join(fileName);
    // const avatar = fileUri;

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUri
    }
    // avatar:{
    //     public_id: "myCloud.public_id",
    //     url:" myCloud.secure_url",
    // },
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
        await sendMail({
            email: user.email,
            subject: "Activate Your account",
            message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`
        })
        res.status(201).json({
            success: true,
            message: `please check your email:- ${user.email} to activate your account!`
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
} catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }

})
//create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m"
    })
}

//activate our user
exports.activation = catchAsyncErrors(async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const newUser = jwt.verify(
            activation_token, 
            process.env.ACTIVATION_SECRET
        );
        if (!newUser) {
            return next(new ErrorHandler("Invalid token", 400))
        }
        const { name, email, password, avatar } = newUser;
        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User already exists", 400));
        }
        user = await User.create({
            name,
            email,
            password,
            avatar,
        })
        sendToken(user, 201, res,'Account activated successfully!')
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

//Login User
exports.login = catchAsyncErrors(async (req, res, next) => {
    try {
        const { email,password } = req.body;
        if(!email || !password){
            return next(new ErrorHandler("Enter all fields",400))
        }
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("User Doesn't exists", 400));
        }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }
        sendToken(user, 200, res,`Welcome back ${user.name}`)
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500))
    }
})

//Load User
exports.loadUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return next(new ErrorHandler("User doesn't exists"))
          }
        res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500))
    }
})
//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    try {
       res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
       });
       res.status(200).json({
        success:true,
        message:"LogOut successfully!"
       })
        
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500))
    }
})