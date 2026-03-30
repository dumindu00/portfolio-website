const express = require("express");
const router = express.Router();
const Skill = require("../models/Skills");
const auth = require("../middleware/auth");

// GET all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message }); // fixed err → error
  }
});

// POST new skill
router.post("/", auth, async (req, res) => {
  try {
    const { name, level, iconURL } = req.body;
    const newSkill = new Skill({ name, level, iconURL });
    await newSkill.save();
    res.json(newSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE skill by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ msg: "Skill not found" });
    await skill.deleteOne();
    res.json({ msg: "Skill removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;