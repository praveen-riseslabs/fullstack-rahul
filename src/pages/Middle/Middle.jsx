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

  const editMeditcation = async (id) => {
   try{
     await axios.put(`http://localhost:5000/delete-medications/${id}`);
    const updatedOne = medications.filter(
        (medication) => medication._id !== id
    );
    setMedications(updatedOne);
  } catch (error) {
    console.error("Error deleting medication:", error);
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
                
                </div>
              ) : (
                <div>
                  <p>Date: {visit.date}</p>
                  <p>Doctor: {visit.doctorName}</p>
                  <p>Reason: {visit.reason}</p>
                 
                </div>
              )}
            </li>
          ))}
        </ul>

<div className="medications-table">
          
          <table className="medications-table">
         
            <tbody>
              {medications.map((medication) => (
                <>
                   <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Reason</th>
                <th>Name</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
           
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
                  <td>
                    <button onClick={() => editMeditcation(medication._id)}>
                      Edit
                    </button>
                  </td>
                </tr>
                </thead>
                </>
              ))}
            </tbody>
          </table>
        </div>
      
      </div>
    </>
  );
};

export default Middle;
