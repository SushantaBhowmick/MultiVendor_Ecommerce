
const catchAsyncErrors = require('./catchAsyncErrors')
const User = require('../model/User');
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken')

exports.isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) return next(new ErrorHandler("Please login to access this resource",401));

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id);

    next();
})