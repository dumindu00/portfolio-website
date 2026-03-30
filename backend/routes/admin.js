const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ADMIN LOGIN
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ msg: "Username and password required" });
    }

    // Check credentials
    if (
        username === process.env.ADMIN_USERNAME_WEBSITE &&
        password === process.env.ADMIN_PASSWORD_WEBSITE
    ) {
        // 🔥 Better payload
        const payload = {
            admin: true,
            username: username
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });

        return res.json({
            success: true,
            token
        });
    }

    return res.status(401).json({
        success: false,
        msg: "Invalid credentials"
    });
});

module.exports = router;