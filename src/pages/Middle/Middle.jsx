import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Middle.css";

const Middle = () => {
    const [visits, setVisits] = useState([]);
    const [editingVisit, setEditingVisit] = useState(null);
    const [newVisit, setNewVisit] = useState({
    name: "",
    dosage: "",
    frequency: "",
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
      setVisits(response.data);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  const addVisit = async (e) => {
    e.preventDefault();
    try {
      console.log(newVisit);
      const response = await axios.post(
        "http://localhost:5000/medications",
        newVisit,newVisit
      );
      setVisits([ ...visits, response.data]);
      setNewVisit({ name: "", dosage: "", frequency: "" , date: "", doctorName: "", reason: "" });
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  const editVisit = async (id) => {
   try{
     await axios.put(`http://localhost:5000/edit-medications/${id}`);
    const updatedOne = visits.filter(
        (medication) => medication._id !== id
    );
    setVisits(updatedOne);
  } catch (error) {
    console.error("Error deleting medication:", error);
  }
};

  const deleteVisit = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-medications/${id}`);
      const updatedMedications = visits.filter(
        (medication) => medication._id !== id
      );
      setVisits(updatedMedications);
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
            value={newVisit.doctorName}
            onChange={(e) =>
              setNewVisit({ ...newVisit, doctorName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newVisit.reason}
            onChange={(e) =>
                setNewVisit({ ...newVisit, reason: e.target.value })
            }
          />
{/* old start */}
<input
            type="text"
            placeholder="Medication Name"
            value={newVisit.name}
            onChange={(e) =>
              setNewVisit({ ...newVisit, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Hospital"
            value={newVisit.dosage}
            onChange={(e) =>
              setNewVisit({ ...newVisit, dosage: e.target.value })
            }
          />
          <input
            type="file" accept=".pdf, .doc, .docx"
            placeholder="Frequency"
            value={newVisit.frequency}
            onChange={(e) =>
              setNewVisit({ ...newVisit, frequency: e.target.value })
            }
          />
             <input
            type= "date"
            placeholder="Date"
            value={newVisit.date}
            onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
          />


          <button type="submit" onClick={addVisit} className="submmitbutton">
            Submit
          </button>
          </form>
        </div>
      

<div className="medications-table">
          
          <table className="medications-table">
         
            <tbody>
              {visits.map((medication) => (
                <>
                   <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Description</th>
                <th>Name</th>
                <th>Hospital Name</th>
                <th>File Upload</th>
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
                    <button onClick={() => deleteVisit(medication._id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={() => setEditingVisit(medication._id)}>
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
