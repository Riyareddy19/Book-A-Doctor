const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getAllAppointments,
  approveAppointment,
} = require("../controllers/appointmentController");

router.post("/", protect, bookAppointment);

router.get("/my", protect, getMyAppointments);
router.get("/all", protect, getAllAppointments);
router.put(
  "/approve/:id",
  protect,
  approveAppointment
);
router.delete("/:id", protect, cancelAppointment);

module.exports = router;