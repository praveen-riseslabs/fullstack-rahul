const mongoose = require('mongoose');

const DoctorVisitSchema = new mongoose.Schema({
  date: { type: String, required: true },
  doctorName: { type: String, required: true },
  reason: { type: String, required: true },
});

module.exports = mongoose.model('DoctorVisit', DoctorVisitSchema);

