const app = require('./app')
const  ConnectDB  = require('./db/Database')

// handleing uncaught exception error
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server handling uncaught exception`)
})


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({
        path: "backend/config/config.env"
    })
}

//connect db
ConnectDB()

//create Server
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Server is working on port http://localhost:${port}`)
})

//unhandled Promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`)
    console.log(`shutting down the`);

    server.close(() => {
        process.exit(1);
    })
})