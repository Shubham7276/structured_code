import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import Register from './Components/register/Register';
import Login from './Components/login/Login';

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token')
  }
  console.log(isAuthenticated());

  const PrivateRoutes = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
  }
  return (
      <Router>
        <Routes>
          <Route path= "register" element = {<Register/>}/>
          <Route path= "login" element = {<Login/>}/>
          <Route element={<PrivateRoutes />}>
            <Route path="*" name="home" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
