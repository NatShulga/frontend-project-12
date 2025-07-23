import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import './i18n';
import Navbar from './pages/header/Navbar';
import AppRoutes from './routes/Routes';

const rollbarConfig = {
  accessToken: 'f4a3d7a1106d41789162305de0df95be',
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const AppContent = () => {
  //const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);

    useEffect(() => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (token && username) {}
    console.log('Auth state:', authState);
}, [authState]);
    
    return (
        <Router>
            <Navbar />
            <AppRoutes />
            <ToastContainer position="top-right" autoClose={3000} />
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
