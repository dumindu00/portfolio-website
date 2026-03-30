const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Admin login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "Username and password required" });
    }

    // Compare with .env values
    if (username === process.env.ADMIN_USERNAME_WEBSITE && password === process.env.ADMIN_PASSWORD_WEBSITE) {
        // Generate JWT
        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.json({ token });
    }

    res.status(401).json({ msg: "Invalid credentials" });
});

module.exports = router;