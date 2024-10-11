const express = require('express')
const { AuthRouter } = require('./handler/aurh')
const app = express()
require('dotenv').config()
const port = process.env.PORT
require("./config/mongo.config")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/auth", AuthRouter)
app.get("/", (req, res, next) => {
    res.status(404).json({
        message: "page not found :("
    })
})
app.get("/", (error, req, res, next) => {
    if (error) {
        return res.status(500).json({
            error: error.message
        })
    }
    res.status(500).json({
        error: "internal server error"
    })
})
app.listen(port, () => console.log('> Server is up and running on port : ' + port))