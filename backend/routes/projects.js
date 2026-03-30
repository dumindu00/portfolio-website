const express = require("express");
const router = express.Router();
const Project = require("../models/Projects");
const auth = require("../middleware/auth");

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new project (admin only)
const upload = require("../middleware/upload");

router.post("/", auth, upload.single("image"), async (req, res) => {
    try {
        const { name, description, githubURL } = req.body;

        const newProject = new Project({
            name,
            description,
            githubURL,
            imageURL: req.file ? req.file.originalname : ""
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