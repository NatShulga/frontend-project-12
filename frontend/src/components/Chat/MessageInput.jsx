import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../../features/slice/chatSlice';
import sendIcon from '../../assets/5064452.svg'; 

const MessageInput = ({ }) => {
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const currentChannelId = useSelector(state => state.chat.currentChannelId);
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.username);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addMessage({
        text,
        username,
        channelId: currentChannelId,
        timestamp: new Date().toISOString(),
      }));
      setText('');
    }
  };

  return (
    <div className="message-input-container" 
      style={{
        width: '100%',
        minWidth: '0',
        flex: '0 0 auto',
        padding: '20px 45px',
        backgroundColor: '#fff',
        borderTop: '1px solid #eee',
        position: 'sticky',
        bottom: 0,
        marginTop: 'auto'
      }}>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            id="messageInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("Введите сообщение...")}
            style={{
              borderRadius: '20px',
              border: '1px solid #ced4da',
            }}
          />
          <Button 
            variant="primary" 
            type="submit"
            disabled={!text.trim()}
            style={{
              borderRadius: '20px',
              marginLeft: '10px',
              backgroundColor: '#4682B4',
              border: 'none'
            }}
          >
            <img 
              src={sendIcon} 
              alt={t("Отправить")}
              style={{
                width: '20px',
                height: '20px',
                filter: 'brightness(0) invert(1)'
              }}
            />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageInput;
