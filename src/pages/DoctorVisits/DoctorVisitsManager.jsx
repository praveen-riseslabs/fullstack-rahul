import React, { useState, useEffect } from 'react';
import "./DoctorVisits.css"; 
import axios from 'axios';


const DoctorVisits = () => {
  const [visits, setVisits] = useState([]);
  const [editingVisit, setEditingVisit] = useState(null);
  const [newVisit, setNewVisit] = useState({ date: '', doctorName: '', reason: '' });

  // Fetch all doctor visits on component mount
  useEffect(() => {
    async function fetchVisits() {
      try {
        const response = await axios.get('http://localhost:5000/doctor-visits');
        setVisits(response.data);
      } catch (error) {
        console.error('Failed to fetch doctor visits:', error);
      }
    }
    fetchVisits();
  }, []);

  const handleEditClick = (visit) => {
    setEditingVisit(visit);
  };

  const handleSaveEdit = async (editedVisit) => {
    try {
      await axios.put(`http://localhost:5000/doctor/:id/${editedVisit._id}`, editedVisit);
      setEditingVisit(null);
      // Refetch the updated visits list after editing
      const response = await axios.get('http://localhost:5000/doctor/:id');
      setVisits(response.data);
    } catch (error) {
      console.error('Failed to update doctor visit:', error);
    }
  };

  const handleDelete = async (visitId) => {
    try {
      console.log(visitId)
      await axios.delete(`http://localhost:5000/doctor-delete/${visitId}`);
      // Filter out the deleted visit from the list
      setVisits(visits.filter((visit) => visit._id !== visitId));
    } catch (error) {
      console.error('Failed to delete doctor visit:', error);
    }
  };

  const handleAddVisit = async () => {
    try {
      console.log(newVisit);
      const response = await axios.post('http://localhost:5000/doctor', newVisit);
      setVisits([...visits, response.data]);
      setNewVisit({ date: '', doctorName: '', reason: '' });
    } catch (error) {
      console.error('Failed to add new doctor visit:', error);
    }
  };

  return (
    <div className='DoctorVisits'>
      <h2>Doctor Visits</h2>
      <div>
        <h3>Add New Visit</h3>
        <input
          type="text"
          placeholder="Date"
          value={newVisit.date}
          onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Doctor Name"
          value={newVisit.doctorName}
          onChange={(e) => setNewVisit({ ...newVisit, doctorName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Reason"
          value={newVisit.reason}
          onChange={(e) => setNewVisit({ ...newVisit, reason: e.target.value })}
        />
        <br></br><br></br>
        <button onClick={handleAddVisit}>Add Visit</button>
      </div>
      <ul>
        {visits.map((visit) => (
          <li key={visit._id}>
            {editingVisit === visit ? (
              <div>
                <input
                  type="text"
                  value={visit.date}
                  onChange={(e) => setEditingVisit({ ...visit, date: e.target.value })}
                />
                <input
                  type="text"
                  value={visit.doctorName}
                  onChange={(e) => setEditingVisit({ ...visit, doctorName: e.target.value })}
                />
                <input
                  type="text"
                  value={visit.reason}
                  onChange={(e) => setEditingVisit({ ...visit, reason: e.target.value })}
                />
                <button onClick={() => handleSaveEdit(editingVisit)}>Save</button>
              </div>
            ) : (
              <div>
                <p>Date: {visit.date}</p>
                <p>Doctor: {visit.doctorName}</p>
                <p>Reason: {visit.reason}</p>
                <button onClick={() => handleEditClick(visit)}>Edit</button>
                <button onClick={() => handleDelete(visit._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorVisits;
