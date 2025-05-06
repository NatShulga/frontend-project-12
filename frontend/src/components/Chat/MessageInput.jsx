import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../../features/slice/chatSlice';

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
        channelId: currentChannelId,
      }));
      setText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border-top">
      <InputGroup>
        <Button variant="light">
          <BiPaperclip />
        </Button>
        <Form.Control
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("Введите сообщение...")}
        />
        <Button variant="primary" type="submit">
          <BiSend />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;
