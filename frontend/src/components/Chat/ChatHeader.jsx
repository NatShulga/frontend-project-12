import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ title, usersCount }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-light p-4 border-bottom">
      <h5 className="m-0">#{title}</h5>
      <small className="text-muted">
        
      </small>
    </div>
  );
};

export default ChatHeader;
