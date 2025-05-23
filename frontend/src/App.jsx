import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import RegisterPage from './components/RegisterPage/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';
import Navbar from './components/header/Navbar';
import ChatPage from './components/Chat/ChatPage';
import NotFound from './components/NotFound';
import ChatComponent from '../src/components/Chat/ChatComponent';


const App = () => {
    const authState = useSelector(state => state.auth);
    useEffect(() => {
    console.log('Auth state:', authState);
}, [authState]);
    
    return (
        <Router>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/chat" element={
                    <>
                        <ChatPage />
                    </>
                } />
                <Route path="/chat-component" element={<ChatComponent />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

        </Router>
    );
};

export default App;
