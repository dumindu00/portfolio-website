const express = require("express");
const router = express.Router();
const Skill = require("../models/Skills");
const auth = require("../middleware/auth");
const { cloudinary } = require("../config/cloudinary");
const upload = require("../middleware/upload");



// GET all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message }); // fixed err → error
  }
});


// ADD NEW SKILL

router.post("/", auth, upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;

    // 1. Basic Validation
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    let iconURL = "";

    // 2. Handle File Upload
    if (req.file) {
      const fileBase64 = req.file.buffer.toString("base64");
      // Fixed the semicolon here:
      const fileDataUri = `data:${req.file.mimetype};base64,${fileBase64}`;

      const result = await cloudinary.uploader.upload(fileDataUri, {
        folder: "portfolio",
        resource_type: "auto" // Good practice to include
      });

      iconURL = result.secure_url;
    }

    // 3. Database Operation
    const newItem = new Skill({
      name,
      iconURL
    });

    await newItem.save();
    res.status(201).json(newItem);

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Server error during skill creation" });
  }
});

// DELETE skill by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ msg: "Skill not found" });
    await skill.deleteOne();
    res.json({ msg: "Skill removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;