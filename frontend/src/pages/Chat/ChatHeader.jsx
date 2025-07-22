import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ title, usersCount, messagesCount = 0 }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-light p-3 border-bottom">
  <h5 className="m-0">#{title}</h5>

</div>
  );
};

export default ChatHeader;
