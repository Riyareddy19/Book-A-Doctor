const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { registerUser, 
        loginUser, 
      } = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;