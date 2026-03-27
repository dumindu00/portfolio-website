const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/admin", require("./routes/admin"));

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));