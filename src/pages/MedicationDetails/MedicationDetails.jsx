import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MedicationDetails.css";
const MedicationDetails = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: ''
  });

  useEffect(() => {
    getAllMedications();
  }, []);

  const getAllMedications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/medications-getall');
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const addMedication = async (e) => {
    e.preventDefault()
    try {
      console.log(newMedication);
      const response = await axios.post('http://localhost:5000/medications', newMedication);
      setMedications([...medications, response.data]);
      setNewMedication({ name: '', dosage: '', frequency: '' });
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  const deleteMedication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-medications/${id}`);
      const updatedMedications = medications.filter((medication) => medication._id !== id);
      setMedications(updatedMedications);
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  return (
    <div className="medication-details-container">
      <h2>Medication Details</h2>

      <form className='add-medication-form' >
        <input
          type="text"
          placeholder="Medication Name"
          value={newMedication.name}
          onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dosage"
          value={newMedication.dosage}
          onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
        />
        <input
          type="text"
          placeholder="Frequency"
          value={newMedication.frequency}
          onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
        />
        <button type="submit"  onClick={addMedication}>Add Medication</button>
      </form>

      <div className="medications-list">
        {medications.map((medication) => (
          <div className="medication-item" key={medication._id}>
            <p>Name: {medication.name}</p>
            <p>Dosage: {medication.dosage}</p>
            <p>Frequency: {medication.frequency}</p>
            <button onClick={() => deleteMedication(medication._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationDetails;
