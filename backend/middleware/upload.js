const multer = require("multer");

const storage = multer.memoryStorage(); // simple for now
const upload = multer({ storage });

module.exports = upload;