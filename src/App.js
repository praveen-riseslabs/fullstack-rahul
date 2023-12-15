import './App.css';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import Home from "./components/Home/Home";
import ResetPass from './components/Resetpassword/ResetPass';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/login/Login';
// function App() {
//   return (
//     <div>
//     <Registration></Registration>
//     {/* <Login></Login> */}
    
//     </div>

//   )
// }

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        
        <Route path='/forgot' element={<ResetPass/>} />
        <Route path="/" element={<Home />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};



export default App;
