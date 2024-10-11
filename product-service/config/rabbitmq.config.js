const amqp = require("amqplib")
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
const createQueue =async (queueName) => {
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

module.exports = {
    pushToQueue,
    initChannel,
    createQueue
}