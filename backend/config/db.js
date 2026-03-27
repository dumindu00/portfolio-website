const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            newUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("😎👌MONGODB CONNECTED")
    } catch (error) {
        console.error(err.message);
        process.exit(1)
    }
}

module.exports = connectDB
