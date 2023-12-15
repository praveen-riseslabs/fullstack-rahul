import React, { useState } from 'react';
import './DoctorVisits.css'

// Doctor Visit Component
const DoctorVisit = ({ visit, index, modifyVisit }) => {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(visit.date);
  const [doctorName, setDoctorName] = useState(visit.doctorName);
  const [reason, setReason] = useState(visit.reason);

  const handleSave = () => {
    modifyVisit(index, date, doctorName, reason);
    setEditing(false);
  };

  return (
    <div>
      {!editing ? (
        <div>
          <p>Date: {visit.date}</p>
          <p>Doctor: {visit.doctorName}</p>
          <p>Reason: {visit.reason}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      ) : (
        <div>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
          <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

// Doctor Visits Manager Component
const DoctorVisitsManager = () => {
  const [visits, setVisits] = useState([
    { date: '2023-12-15', doctorName: 'Dr. Smith', reason: 'Check-up' },
    { date: '2023-12-20', doctorName: 'Dr. Johnson', reason: 'Follow-up' },
  ]);

  const addVisit = () => {
    // Logic to add a new visit
    // Assuming the new visit details are entered through a form and added to 'visits' state
  };

  const modifyVisit = (index, date, doctorName, reason) => {
    const updatedVisits = [...visits];
    updatedVisits[index] = { date, doctorName, reason };
    setVisits(updatedVisits);
  };

  return (
    <div className="DoctorVisitsManager">
      <h2>Doctor Visits</h2>
      {visits.map((visit, index) => (
        <DoctorVisit
          key={index}
          index={index}
          visit={visit}
          modifyVisit={modifyVisit}
        />
      ))}
      <button onClick={addVisit}>Add Visit</button>
    </div>
  );
};

export default DoctorVisitsManager;
