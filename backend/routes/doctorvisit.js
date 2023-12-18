const express = require("express");

const router = express.Router();

const userController = require("../controllers/userDoctorVisit");

const {
    getAllDoctorVisits,
    getDoctorVisitById,
    createDoctorVisit,
    updateDoctorVisit,
    deleteDoctorVisit,
  } = require ("../controllers/userDoctorVisit");

// Get all doctor visits
router.get('/', getAllDoctorVisits);

// Get a specific doctor visit by ID
router.get('/:id', getDoctorVisitById);

// Create a new doctor visit
router.post('/doctor', createDoctorVisit);

// Update a doctor visit by ID
router.put('/doctor-edit', updateDoctorVisit);

// Delete a doctor visit by ID
router.delete('/doctor-delete', deleteDoctorVisit);



module.exports = router;