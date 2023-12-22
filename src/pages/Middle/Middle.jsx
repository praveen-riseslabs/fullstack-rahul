import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Middle.css";

const Middle = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    date: "",
    doctorName: "",
    reason: "",
  });
  const [visits, setVisits] = useState([]);
  const [editingVisit, setEditingVisit] = useState(null);
  const [newVisit, setNewVisit] = useState({
    date: "",
    doctorName: "",
    reason: "",
  });

//   Fetch all doctor visits on component mount
  useEffect(() => {
    async function fetchVisits() {
      try {
        const response = await axios.get("http://localhost:5000/doctor-visits");
        setVisits(response.data);
      } catch (error) {
        console.error("Failed to fetch doctor visits:", error);
      }
    }
    fetchVisits();
  }, []);

  const handleEditClick = (visit) => {
    setEditingVisit(visit);
  };

  const handleSaveEdit = async (editedVisit) => {
    try {
      await axios.put(
        `http://localhost:5000/doctor/:id/${editedVisit._id}`,
        editedVisit
      );
      setEditingVisit(null);
      // Refetch the updated visits list after editing
      const response = await axios.get("http://localhost:5000/doctor/:id");
      setVisits(response.data);
    } catch (error) {
      console.error("Failed to update doctor visit:", error);
    }
  };

  const handleDelete = async (visitId) => {
    try {
      console.log(visitId);
      await axios.delete(`http://localhost:5000/doctor-delete/${visitId}`);
      // Filter out the deleted visit from the list
      setVisits(visits.filter((visit) => visit._id !== visitId));
    } catch (error) {
      console.error("Failed to delete doctor visit:", error);
    }
  };

  const handleAddVisit = async () => {
    try {
      console.log(newVisit);
      const response = await axios.post(
        "http://localhost:5000/doctor",
        newVisit
      );
      setVisits([...visits, response.data]);
      setNewVisit({ date: "", doctorName: "", reason: "" });
    } catch (error) {
      console.error("Failed to add new doctor visit:", error);
    }
  };

  //-------------------------------medical--------------------------

  useEffect(() => {
    getAllMedications();
  }, []);

  const getAllMedications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/medications-getall"
      );
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  const addMedication = async (e) => {
    e.preventDefault();
    try {
      console.log(newMedication);
      const response = await axios.post(
        "http://localhost:5000/medications",
        newMedication,newVisit
      );
      setMedications([...medications, ...visits, response.data]);
      setNewMedication({ name: "", dosage: "", frequency: "" , date: "", doctorName: "", reason: "" });
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  const deleteMedication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-medications/${id}`);
      const updatedMedications = medications.filter(
        (medication) => medication._id !== id
      );
      setMedications(updatedMedications);
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  // const Middle = () => {
  return (
    <>
      <div className="DoctorVisits">
        <h2>Doctor Visits</h2>
        <div>
        <form className="add-medication-form">
          {/* <h3>Add New Visit</h3> */}
       
          <input
            type="text"
            placeholder="Doctor Name"
            value={newMedication.doctorName}
            onChange={(e) =>
              setNewMedication({ ...newMedication, doctorName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Reason"
            value={newMedication.reason}
            onChange={(e) =>
                setNewMedication({ ...newMedication, reason: e.target.value })
            }
          />
{/* old start */}
<input
            type="text"
            placeholder="Medication Name"
            value={newMedication.name}
            onChange={(e) =>
              setNewMedication({ ...newMedication, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Dosage"
            value={newMedication.dosage}
            onChange={(e) =>
              setNewMedication({ ...newMedication, dosage: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Frequency"
            value={newMedication.frequency}
            onChange={(e) =>
              setNewMedication({ ...newMedication, frequency: e.target.value })
            }
          />
             <input
            type= "date"
            placeholder="Date"
            value={newMedication.date}
            onChange={(e) => setNewMedication({ ...newMedication, date: e.target.value })}
          />

{/* old continue */}
          {/* <button onClick={handleAddVisit}>Add Visit</button> */}
          <button type="submit" onClick={addMedication} className="submmitbutton">
            Submit
          </button>
          </form>
        </div>
        <ul>
          {visits.map((visit) => (
            <li key={visit._id}>
              {editingVisit === visit ? (
                <div>
                  <input
                    type="text"
                    value={visit.date}
                    onChange={(e) =>
                      setEditingVisit({ ...visit, date: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={visit.doctorName}
                    onChange={(e) =>
                      setEditingVisit({ ...visit, doctorName: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={visit.reason}
                    onChange={(e) =>
                      setEditingVisit({ ...visit, reason: e.target.value })
                    }
                  />
                  {/* <button onClick={() => handleSaveEdit(editingVisit)}>
                    Save
                  </button> */}
                </div>
              ) : (
                <div>
                  <p>Date: {visit.date}</p>
                  <p>Doctor: {visit.doctorName}</p>
                  <p>Reason: {visit.reason}</p>
                  {/* <button onClick={() => handleEditClick(visit)}>Edit</button>
                  <button onClick={() => handleDelete(visit._id)}>
                    Delete
                  </button> */}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* --------------------------medical--------------------- */}

        

        {/* <form className="add-medication-form">
          
          <button type="submit" onClick={addMedication}>
            Add Medication
          </button>
        </form> */}

        {/* <div className="medications-list">
          {medications.map((medication) => (
            <div className="medication-item" key={medication._id}>
                  <p>Date: {medication.date}</p>
                  <p>Doctor: {medication.doctorName}</p>
                  <p>Reason: {medication.reason}</p>
              <p>Name: {medication.name}</p>
              <p>Dosage: {medication.dosage}</p>
              <p>Frequency: {medication.frequency}</p>
              <button onClick={() => deleteMedication(medication._id)}>
                Delete
              </button>
            </div>
          ))}
        </div> */}

<div className="medications-table">
          
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Reason</th>
                <th>Name</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medication) => (
                <tr key={medication._id}>
                  <td>{medication.date}</td>
                  <td>{medication.doctorName}</td>
                  <td>{medication.reason}</td>
                  <td>{medication.name}</td>
                  <td>{medication.dosage}</td>
                  <td>{medication.frequency}</td>
                  <td>
                    <button onClick={() => deleteMedication(medication._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
      </div>
    </>
  );
};

export default Middle;
