const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    products: [{ _id: String }],
    userEmail: String,
    totalPrice: Number,
}, { timestamps: true })
const orderModel = model("order", orderSchema)
module.exports = {
    orderModel
}