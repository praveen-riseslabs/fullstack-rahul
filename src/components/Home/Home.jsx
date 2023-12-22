import react from 'react';
// import DoctorVisitsManager from '../../pages/DoctorVisits/DoctorVisitsManager';
// import HealthRecords from '../../pages/HealthRecords/HealthRecords';
// import MedicationDetails from '../../pages/MedicationDetails/MedicationDetails';
import Middle from '../../pages/Middle/Middle';
import Sidebar from '../../pages/Sidebar/Sidebar';
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
    <nav className="navbar">
      <div className="navbar-brand">Welcome to Your Dashboard</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="#" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Services</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
    <div className="component-column">

    <Sidebar></Sidebar>
      <Middle />
     
   
    </div>
  </div>
  );
}

export default Home;

