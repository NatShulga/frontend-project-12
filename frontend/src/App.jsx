import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container } from 'react-bootstrap';

const App = () => {
    const isLoggedIn = true;

return (
    <Router>
    <Routes>
        <Route path="/login" element={<Login />} />
        {/* тут логика если пользователь авторизовался, то перенаправляется в чат, если нет то назад на форму логина. Navigate для перенаправления. */}
        <Route path="/"element={isLoggedIn ? <Chat /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} /> {/* Страница 404 */}
    </Routes>
    </Router>
);
};

export default App;
