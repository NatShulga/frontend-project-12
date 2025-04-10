import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login/Login';
import RegisterPage from './components/RegisterPage/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';
import Navbar from './components/header/Navbar';
import ChatPage from './components/Chat/ChatPage';
import ChannelList from './components/Chat/ChannelList';
import NotFound from './components/NotFound';


const App = () => {
    
    return (
        <Router>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/chat" element={
                    <>
                        <ChannelList />
                        <ChatPage />
                    </>
                } />
                <Route path="*" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <h1>Текущий канал</h1>
        </Router>
    );
};

export default App;
