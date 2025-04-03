import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import RegisterPage from './components/RegisterPage/RegisterForm';
import Chat from './components/Chat/ChatToken';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/header/Navbar';
import ChatPage from './components/Chat/ChatPage';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <Router>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route path="/chat" element={
                    <PrivateRoute>
                        <ChatPage />
                    </PrivateRoute>
                } />
                
                <Route path="/" element={
                    <PrivateRoute>
                        <Chat />
                    </PrivateRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
