const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const AWS = require("aws-sdk");

require("aws-sdk/lib/maintenance_mode_message").suppress = true;

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
app.use(bodyParser.json());

app.use(cors());
const origin = ["http://localhost:3000"];

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

// Get object endpoint
app.get("/getObject/:key", async (req,res) => {
  const key = req.params.key;
  try {
    //Fetch file from s3
    const getObjectParam = {
      Bucket: "riseslabs",
      Key: key,
    };
    const data = await s3.send(new GetObjectCommand(getObjectParam));
    res.send(data.Body);
  } catch (error) {
    console.error(err);
    res.status(500).send('Failed to retrieve file');
  }
});

// Delete Object Endpoint
app.delete("/deleteObject/:key", async (req,res) => {
  const key = req.params.key;
  try {
    // Delete file from S3
    const deleteObjectParams = {
      Bucket: "riseslabs",
      Key: key,
    };
    await s3.send(new DeleteObjectCommand(deleteObjectParams));
    res.send('File deleted successfully');
  } catch (error) {
    console.error(err);
    res.status(500).send('Failed to delete file');
  }
});



//database connection
const connect = require("./config/database");
connect
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log("error");
    process.exit(1);
  });

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

//--------------------ROUTES----------------
const userRoutes = require("./routes/users");
const doctorvisitRoutes = require("./routes/doctorvisit");
const medicationRoutes = require("./routes/medication")

app.use("/users", userRoutes);
app.use('/', doctorvisitRoutes);
app.use ('/',medicationRoutes )

app.get("/check", (req, res) => {
  console.log(req.cookies);
  res.send("ok");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
