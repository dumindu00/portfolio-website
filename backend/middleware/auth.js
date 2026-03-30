const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 CRITICAL CHECK
        if (!decoded.admin) {
            return res.status(403).json({ msg: "Not authorized as admin" });
        }

        req.admin = true;
        next();

    } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = auth;