import React, { useState } from 'react';
import './MedicationDetails.css'; // Import CSS file for styling

const MedicationDetails = () => {
  // State for managing medication details
  const [medications, setMedications] = useState([
    // Initial medication data (you can populate this array with your data structure)
    { name: 'Dolo 650', dosage: '500mg', frequency: 'Twice a day' },
    // Add more initial medication data as needed
  ]);

  // Function to add a new medication
  const addMedication = () => {
    // Logic to add a new medication to the medications state
  };

  // Function to delete a medication
  const deleteMedication = (index) => {
    // Logic to delete a medication from the medications state
  };

  return (
    <div className="medication-details-container">
      <h2>Medication Details</h2>

      {/* Form for adding new medication */}
      <form className="add-medication-form" onSubmit={addMedication}>
        <input type="text" placeholder="Medication Name" />
        <input type="text" placeholder="Dosage" />
        <input type="text" placeholder="Frequency" />
        <button type="submit">Add Medication</button>
      </form>

      {/* Display medication details */}
      <div className="medications-list">
        {medications.map((medication, index) => (
          <div className="medication-item" key={index}>
            <p>Name: {medication.name}</p>
            <p>Dosage: {medication.dosage}</p>
            <p>Frequency: {medication.frequency}</p>
            {/* Delete button for each medication */}
            <button onClick={() => deleteMedication(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationDetails;
