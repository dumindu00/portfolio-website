const express = require("express");
const router = express.Router();
const Project = require("../models/Projects");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { cloudinary } = require("../config/cloudinary");


// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// POST NEW PROJECT
router.post("/", auth, upload.single("image"), async (req, res) => {
    try {
        const { name, description, githubURL } = req.body;

        let imageURL = "";

        if (req.file) {
            // Convert buffer to base64
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "portfolio"
            });

            imageURL = result.secure_url;
        }

        const newProject = new Project({
            name,
            description,
            githubURL,
            imageURL
        });

        await newProject.save();
        res.json(newProject);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});






// DELETE project by ID (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });
    await project.deleteOne();
    res.json({ msg: "Project removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;