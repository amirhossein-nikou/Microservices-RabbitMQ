const { createOrderWithQueue } = require('./config/rabbitmq.config')
require("./config/mongo.config")
createOrderWithQueue("ORDER")
