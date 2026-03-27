const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");

// Admin login
router.post("/login", async (req, res) => {
    const { password } = req.body;

    if (!password) return res.status(400).json({ msg: "Password required" });

    if (password === process.env.ADMIN_PASSWORD) {
        // generate token
        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.json({ token });
    } else {
        res.status(401).json({ msg: "Invalid password" });
    }
});

module.exports = router;