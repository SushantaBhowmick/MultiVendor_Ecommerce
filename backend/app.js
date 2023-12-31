const express = require('express');
const error = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors')

const app = express();


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use(morgan("dev"));

app.use(cors({
    origin: ['http://localhost:3000',],
    credentials: true
  }));

app.use("/",express.static("uploads"))

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:"backend/config/config.env"
    })
}


//imports Routes
const userRoute = require('./routes/user')

app.use("/api/v2/user",userRoute)


//its for ErrorHandler
app.use(error);

module.exports = app;