const { Router } = require("express");
const { userModel } = require("../model/auth.model");
const router = Router()
const jwt = require("jsonwebtoken")
router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const existUser = await userModel.findOne({ email })
        if (existUser) throw { message: "user already exists" }
        const user = await userModel.create({
            email,
            name,
            password
        })
        return res.json({
            message: "user created"
        })
    } catch (error) {
        next(error)
    }
})
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) throw { message: "user not found!" }
        if(password == user.password){
            const token = await jwt.sign({ email, id: user._id, name: user.name },"secret")
            return res.json({
                token
            })
        }
        return res.json({
            message: "wrong information for login"
        })
    } catch (error) {
        next(error)
    }
})


module.exports = {
    AuthRouter: router
} 