const Medication = require('../models/Medication'); // Import the Medication model
const multer = require("multer");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const express = require("express");

const {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  credentials: {
    accessKeyId: "AKIAVAND6V4DC36JGN47",
    secretAccessKey: "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",
  },
  region: "ap-south-1",
});


const app = express();
// app.use(bodyParser.json());

// app.use(cors());
// const origin = ["http://localhost:3000"];
// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set your desired folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Custom file naming (timestamp + original filename)
  },
});

const upload = multer({ storage: storage });

// Handle file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const params = {
    Bucket: "riseslabs",
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);
  // res.send('File uploaded successfully');
  res.status(200).json({ filename: req.file.originalname });
});




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

const editMedication = async (req,res) => {
try {
  const editedMedication = await Medication.findByIdAndUpdate(req.params.id);
  if(!editedMedication) {
    return res.status(404).json({ message: 'id not found'});
  }
  res.json({ message: 'Medication edited' });
} catch (error) {
  res.status(500).json({ message: err.message});
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
  deleteMedication,
  editMedication
};