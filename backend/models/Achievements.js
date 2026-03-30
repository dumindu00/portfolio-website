const mongoose = require("mongoose")

const AchievementSchema = new mongoose.Schema({
    title : { type: String, required: true },
    organization: { type: String },
    description: { type: String },
    imageURL: { type: String }
}, { timestamps: true })


module.exports = mongoose.model("Achievement", AchievementSchema)