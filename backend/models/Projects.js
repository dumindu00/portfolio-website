const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    imageURL: { type: String },
    githubURL: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("Project", ProjectSchema)