const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/",
  protect,
  upload.single("report"),
  (req, res) => {
    res.json({
      message: "File uploaded successfully",
      file: req.file.filename,
    });
  }
);

module.exports = router;