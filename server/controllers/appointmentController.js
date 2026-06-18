const Appointment = require("../models/Appointment");

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.json({
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.status = "Approved";

    await appointment.save();

    res.json({
      message: "Appointment approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, slot } = req.body;

    const appointment =
      await Appointment.create({
        patientId: req.user.id,
        doctorId,
        slot,
      });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.id,
    }).populate("doctorId");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctorId")
      .populate("patientId", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getAllAppointments,
  approveAppointment,
};