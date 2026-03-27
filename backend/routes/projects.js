const express = require("express")
const router = express.Router()
const Project = require("../models/Projects")
const auth = require("../middleware/auth")


// GET all projects
router.get("/", async (req, res) => {

    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// POST new project (admin only)
router.post("/", auth, async (req, res) => {
    
    try {
        const { name, description, imageURL, githubURL } = req.body;
        const newProject = new Project({ name, description, imageURL, githubURL })
        await newProject.save()
        res.json(newProject)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// DELETE project by ID (admin only)

router.delete(":/id", auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: "Project no found" });

        await project.remove()
        res.json({ msg: "Project removed" })
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router