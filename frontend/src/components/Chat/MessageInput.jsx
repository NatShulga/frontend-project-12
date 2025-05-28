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
    <div style={{ position: 'fixed', bottom: "100px", width: '50%', 
      padding: '0 15px',
      left: '35%' 
      }}>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("Введите сообщение...")}
            />
          <Button variant="primary" 
          type="submit"
          onClick={handleSubmit}
          style={{
            width: "40px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0, 
            backgroundColor: '#4682B4',
            border: '2px solid #4682B4',
          }}
            >
              <img 
                src={sendIcon} 
                alt=""
                style={{
                  width: '23px',
                  height: '23px',
                  marginLeft: '1px',
                  filter: 'invert(99%) sepia(1%) saturate(0%) hue-rotate(355deg) brightness(115%) contrast(100%)',
                  
                  }}
              />
          </Button>
        </InputGroup>
      </Form>
      </div>
  );
};

export default MessageInput;
