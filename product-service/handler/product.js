const { Router } = require("express");
const { productModel } = require("../model/product.model");
const { isAuthenticated } = require("../../authGuard");
const { pushToQueue, createQueue } = require("../config/rabbitmq.config");

const router = Router()
router.post("/create", async (req, res, next) => {
    try {
        const { title, desc, price } = req.body

        const product = await productModel.create({
            title,
            desc,
            price
        })
        return res.status(201).json({ message: "product created successfully" })
    } catch (error) {
        next(error)
    }
})
router.post("/buy", isAuthenticated, async (req, res, next) => {
    try {
        const { productIds } = req.body
        const products = await productModel.find({ _id: { $in: productIds } })
        const { email } = req.user
        pushToQueue("ORDER", { products, userEmail: email })
        const channel = await createQueue("PRODUCT")
        await channel.consume("PRODUCT", async msg => {
            console.log(JSON.parse(msg.content.toString()));
        })
        return res.json({message: "order created"})
    } catch (error) {
        next(error)
    }
})
module.exports = {
    ProductRouter: router
} 