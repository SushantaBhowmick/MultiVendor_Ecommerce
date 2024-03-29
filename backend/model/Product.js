const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your product name"]
    },
    description:{
        type: String,
        required:[true,"Please enter your product description"]
    },
    category:{
        type: String,
        required:[true,"Please enter your product category"]
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        required:[true,"Please enter your product discount price"]
    },
    stock:{
        type: Number,
        required:[true,"Please enter your product stock"]
    },
    images:[
        {
            type:String,
        },
    ],
    ratings:{
        type:String,
    },
    shopId:{
        type:String,
        requierd:true,
    },
    shop:{
        type: Object,
        required:true,
    },
    sold_out:{
        type:Number,
        default:0
    },
    createAt:{
        type:Date,
        default:Date.now(),
    },
})

module.exports = mongoose.model("Product",productSchema);

