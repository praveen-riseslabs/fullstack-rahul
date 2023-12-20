const Medication = require('../models/Medication'); // Import the Medication model

const getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addMedication = async (req, res) => {
  const { name, dosage, frequency, date, doctorName, reason  } = req.body;
  try {
    const newMedication = new Medication({ name, dosage, frequency, date, doctorName, reason  });
    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMedication = async (req, res) => {
  try {
    const deletedMedication = await Medication.findByIdAndDelete(req.params.id);
    if (!deletedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    res.json({ message: 'Medication deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMedications,
  addMedication,
  deleteMedication
};