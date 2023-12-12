const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const multer = require("multer")
const fs = require('fs');

const AWS = require('aws-sdk');


const app = express();
app.use(bodyParser.json());

app.use(cors());
const origin = ["http://localhost:3000"];


const s3 = new AWS.S3({
  accessKeyId: 'AKIAVAND6V4DPBNIYBPC',
  secretAccessKey: 'pvMYroioWJwIXoT6wLNQ/jTDc7i+8FSgI+i00vKx+JXEhV8jE',
  region: 'ap.south-1',
});

app.post('/upload', (req, res) => {
  const uploadParams = {
    Bucket: 'myBucket',
    Key: req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to upload file');
    }
    res.send('File uploaded successfully');
  });
});

app.delete('/delete/:key', (req, res) => {
  const deleteParams = {
    Bucket: 'myBucket',
    Key: req.params.key,
  };

  s3.deleteObject(deleteParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to delete file');
    }
    res.send('File deleted successfully');
  });
});

app.put('/edit/:key', (req, res) => {
  const copyParams = {
    Bucket: 'myBucket',
    CopySource: `myBucket/${req.params.key}`,
    Key: req.body.editedFileName,
  };

  s3.copyObject(copyParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to edit file name');
    }
    
    const deleteParams = {
      Bucket: 'myBucket',
      Key: req.params.key,
    };
  
    s3.deleteObject(deleteParams, (deleteErr, deleteData) => {
      if (deleteErr) {
        console.error(deleteErr);
        return res.status(500).send('Failed to delete old file');
      }
      res.send('File edited successfully');
    });
  });
});








//database connection
const connect = require("./config/database");
connect
.then(() => {
    console.log("Successfully connected to database")
}).catch((err) => {
    console.log("error");
    process.exit(1);
});

app.use(cors({origin:["http://localhost:3000"], credentials:true}));

//--------------------ROUTES----------------
const userRoutes = require("./routes/users");

app.use("/users", userRoutes);
app.get("/check", (req, res) => {
    console.log(req.cookies);
    res.send("ok");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
