import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import RegisterPage from './components/RegisterPage/RegisterForm.jsx';
import Chat from './components/Chat/Chat.jsx';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/header/Navbar.jsx';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('token'); //проверка на наличие токена

    return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {

return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/"element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
);
};

export default App;
