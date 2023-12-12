import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Fetch initial list of files from the backend upon component mount
    fetchFiles();
  }, []);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchFiles();
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files');
      setFileList(response.data.files);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const deleteFile = async (fileName) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${fileName}`);
      fetchFiles();
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const editFile = async (oldFileName) => {
    try {
      await axios.put(`http://localhost:5000/edit/${oldFileName}`, { editedFileName: fileName });
      fetchFiles();
    } catch (error) {
      console.error('Failed to edit file name:', error);
    }
  };

  return (
    <div>
      <h3>Upload File</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <h3>File List</h3>
      <ul>
        {fileList.map((file, index) => (
          <li key={index}>
            {file}
            <button onClick={() => deleteFile(file)}>Delete</button>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <button onClick={() => editFile(file)}>Edit Name</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
