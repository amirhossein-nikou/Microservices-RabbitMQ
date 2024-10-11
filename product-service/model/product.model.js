const { Schema,model } = require("mongoose");

const productSchema = new Schema({
    title: String,
    desc: String,
    price: String,
},{timestamps: true})
const productModel = model("product",productSchema)
module.exports = {
    productModel
}