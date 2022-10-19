import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import Login from './Login & SignUp/Login';
import SignUp from './Login & SignUp/SignUp';
import BmiHistory from './Pages/BmiHistory';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
         <Route path="/" element={<HomePage />} /> 
         <Route path="/signup" element={<SignUp />} />
         <Route path="/login" element={  <Login />} />
         <Route path="/history" element={<BmiHistory />} />
      </Routes>
    </div>
  );
}

export default App;
