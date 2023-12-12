const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS credentials and S3 object
const s3 = new AWS.S3({
  accessKeyId: 'AKIAVAND6V4DPBNIYBPC',
  secretAccessKey: 'pvMYroioWJwIXoT6wLNQ/jTDc7i+8FSgI+i00vKx+JXEhV8jE'
});

// File details
const filePath = '"D:\a\DESKTOP DOC\rahul yadav (german).docx"'; // Replace with your file path
const bucketName = 'rises-labs'; // Replace with your bucket name

// Read file content
const fileContent = fs.readFileSync(filePath);

// Upload parameters
const params = {
  Bucket: bucketName,
  Key: 'file.txt', // Replace with your desired file name in the bucket
  Body: fileContent
};

// Upload file to the bucket
s3.upload(params, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('File uploaded successfully:', data.Location);
  }
});

// Retrieve file from S3
const getObjectParams = {
    Bucket: bucketName,
    Key: 'file.txt' // Replace with the file key you want to retrieve
  };
  
  s3.getObject(getObjectParams, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // File content is available in data.Body
      fs.writeFileSync('downloaded-file.txt', data.Body);
      console.log('File downloaded successfully');
    }
  });
  
