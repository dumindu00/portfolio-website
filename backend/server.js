/* This code snippet is setting up a Node.js server using Express framework. Here's a breakdown of what
each part is doing: */
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const auth = require("./middleware/auth")

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "https://portfolio-website-729irfeiz-dumindu.vercel.app",
    credentials: true
}));







// Routes
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/achievements", require("./routes/Achievements"))
app.use("/api/admin", require("./routes/admin"));


app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/private/admin.html"))
})




// Serve frontend static files
app.use(express.static(path.join(__dirname, "../public")));





// Replace your current app.get('(*)', ...) with this:
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));