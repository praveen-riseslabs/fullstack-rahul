const User = require("../models/DoctorVisit");

// Get all doctor visits
const getAllDoctorVisits = async (req, res) => {
    try {
      const visits = await DoctorVisit.find();
      res.json(visits);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Get a specific doctor visit by ID
  const getDoctorVisitById = async (req, res) => {
    try {
      const visit = await DoctorVisit.findById(req.params.id);
      if (!visit) {
        return res.status(404).json({ message: 'Doctor visit not found' });
      }
      res.json(visit);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Create a new doctor visit
  const createDoctorVisit = async (req, res) => {
    const { date, doctorName, reason } = req.body;
    const newVisit = new User({ date, doctorName, reason });
    try {
      const savedVisit = await newVisit.save();
      res.status(201).json(savedVisit);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Update a doctor visit by ID
  const updateDoctorVisit = async (req, res) => {
    try {
      const visit = await DoctorVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!visit) {
        return res.status(404).json({ message: 'Doctor visit not found' });
      }
      res.json(visit);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Delete a doctor visit by ID
  const deleteDoctorVisit = async (req, res) => {
    try {
      const visit = await DoctorVisit.findByIdAndDelete(req.body.id);
      if (!visit) {
        return res.status(404).json({ message: 'Doctor visit not found' });
      }
      res.json({ message: 'Doctor visit deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = {
    getAllDoctorVisits,
    getDoctorVisitById,
    createDoctorVisit,
    updateDoctorVisit,
    deleteDoctorVisit,
  };