import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../../features/slice/chatSlice';
import sendIcon from '../../assets/стрелка вверх.svg'; 

const MessageInput = () => {
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const currentChannelId = useSelector(state => state.chat.currentChannelId);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addMessage({
        text,
        sender,
        channelId: currentChannelId,
      }));
      setText('');
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: "100px", width: '50%', 
      padding: '0 15px',
      left: '35%' }}>
      <InputGroup>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("Введите сообщение...")}
            />
          <Button variant="primary" type="submit"
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
                  width: '20px',
                  height: '20px',
                  marginLeft: '1px',
                  filter: 'invert(83%) sepia(33%) saturate(4206%) hue-rotate(1deg) brightness(105%) contrast(87%)',
                  
                  }}
              />
        </Button>
      </InputGroup>
      </div>
  );
};

export default MessageInput;
