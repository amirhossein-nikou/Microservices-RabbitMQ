const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://localhost:27017/auth-service').then(() => {
    console.log("connected to auth service");
})