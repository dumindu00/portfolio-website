const express = require("express")
const router = express.Router()
const Achievement = require("../models/Achievements")
const auth = require("../middleware/auth")
const { cloudinary } = require("../config/cloudinary")
const upload = require("../middleware/upload")


// GET all Achievements
router.get("/", async (req, res) => {

    try {
        const achievements = await Achievement.find().sort({ createdAt: 1 });
        res.json(achievements)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})




// POST NEW ACHIEVEMENT
router.post("/", auth, upload.single("image"), async (req, res) => {
    try {
        let imageURL = "";

        // 1. Only run upload logic if a file actually exists
        if (req.file) {
            // Convert buffer to base64 string
            const fileBase64 = req.file.buffer.toString("base64");
            const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

            // Upload to Cloudinary (this returns a Promise, so 'await' works)
            const result = await cloudinary.uploader.upload(fileUri, {
                folder: "portfolio"
            });
            
            imageURL = result.secure_url;
        }

        const { title, organization, description } = req.body;

        const newItem = new Achievement({
            title,
            organization,
            description,
            imageURL
        });

        await newItem.save();
        res.status(201).json(newItem);

    } catch (err) {
        console.error(err); // Good for debugging
        res.status(500).json({ error: err.message });
    }
});


// DELETE ACHIEVEMENT
router.delete("/:id", auth, async (req, res) => {

    try {
        await Achievement.findByIdAndDelete(req.params.id)
        res.json({ msg: "Deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
module.exports = router