import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import RegisterPage from '../pages/RegisterPage/RegisterForm';
import ChatPage from '../pages/Chat/ChatPage';
import ChatComponent from '../pages/Chat/ChatComponent';
import NotFound from '../pages/NotFound';


const AppRoutes = () => {
    return (
    <Routes>
        <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/" element={
                <>
                    <ChatPage />
                </>
            } />
            <Route path="/chat" element={<ChatComponent />} />
            {}
            <Route path="*" element={<NotFound />} />
            </Routes>
);
};

export default AppRoutes;
