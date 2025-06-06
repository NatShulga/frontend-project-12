import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Login from './components/Login/Login';
import RegisterPage from './components/RegisterPage/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import './i18n';
import Navbar from './components/header/Navbar';
import ChatPage from './components/Chat/ChatPage';
import NotFound from './components/NotFound';
import ChatComponent from '../src/components/Chat/ChatComponent';

const rollbarConfig = {
  accessToken: 'f4a3d7a1106d41789162305de0df95be',
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const AppContent = () => {
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

const App = () => {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
