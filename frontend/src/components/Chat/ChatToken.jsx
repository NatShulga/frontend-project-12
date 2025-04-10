import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Chat() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        navigate('/login');
        }
    }, [navigate]);

return (
    <div>
        <h2>{t("Чат")}</h2>
        <p>{t("Добро пожаловать в чат")}</p>
    </div>
)
};

export default Chat;
