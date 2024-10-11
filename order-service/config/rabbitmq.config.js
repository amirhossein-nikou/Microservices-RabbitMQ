const amqp = require("amqplib");
const { orderModel } = require("../model/order.model");
let channel;
async function createChannel() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        return await connection.createChannel()
    } catch (error) {
        console.log("cannot connect to rabbitMQ");
    }
}
const initChannel = async () => {
    if (!channel) {
        channel = createChannel()
    }
    return channel
}
const createQueue = async (queueName) => {
    try {
        const channel = await initChannel();
        await channel.assertQueue(queueName);
        return channel;
    } catch (error) {
        console.log(error);
    }
}
const pushToQueue = async (queueName, data) => {
    try {
        const channel = await initChannel()
        await channel.assertQueue(queueName);
        return await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log("error: ", error.message);
    }
}
const createOrderWithQueue = async (queueName) => {
    const channel = await createQueue(queueName);
    await channel.consume(queueName, async msg => {
        const {userEmail, products } = JSON.parse(msg.content.toString())
        const newOrder = await orderModel.create({
            userEmail,
            products,
            totalPrice: (products.map(p => +p.price)).reduce((prev, curr) => prev + curr, 0)
        })
        channel.ack(msg)
        await pushToQueue("PRODUCT",newOrder)
    })
}
module.exports = {
    pushToQueue,
    initChannel,
    createOrderWithQueue
}