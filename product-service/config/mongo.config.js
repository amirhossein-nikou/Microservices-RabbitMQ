const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://localhost:27017/product-service').then(() => {
    console.log("connected to auth service");
})