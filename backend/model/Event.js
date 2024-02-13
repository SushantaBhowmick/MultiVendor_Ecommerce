const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your event product name"]
    },
    description:{
        type: String,
        required:[true,"Please enter your event product description"]
    },
    category:{
        type: String,
        required:[true,"Please enter your event product category"]
    },
    start_Date:{
        type:Date,
        required:true,
    },
    Finish_Date:{
        type:Date,
        required:true,
    },
    status:{
        type:Date,
        default:"Running",
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        required:[true,"Please enter your event product discount price"]
    },
    stock:{
        type: Number,
        required:[true,"Please enter your event product stock"]
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

module.exports = mongoose.model("Event",eventSchema);

