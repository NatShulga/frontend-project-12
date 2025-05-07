import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ title, usersCount }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-light p-3 border-bottom">
      <h5 className="m-0">#{title}</h5>
      <small className="text-muted">
        {t('0 сообщений', { count: usersCount || 0 })}
      </small>
    </div>
  );
};

export default ChatHeader;
