const express = require("express");

const router = express.Router();
const userMedication = require("../controllers/userMedication");

const {
    getAllMedications,
  addMedication,
  deleteMedication,
} = require("../controllers/userMedication");

router.get('/medications-getall', getAllMedications);
router.post('/medications', addMedication);
router.delete('/delete-medications/:id', deleteMedication);

module.exports = router;