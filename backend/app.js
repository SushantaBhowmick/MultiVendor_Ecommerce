const express = require('express')
const app = express();

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:"backend/config/config.env"
    })
}
const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`Server is working on port ${port}`)
})