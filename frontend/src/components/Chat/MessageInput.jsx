import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BiSend, BiPaperclip } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, selectCurrentChannelId } from './chatSlice';

const MessageInput = () => {
  const [text, setText] = useState('');
  const currentChannelId = useSelector(selectCurrentChannelId);
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
          placeholder="Type a message..."
        />
        <Button variant="primary" type="submit">
          <BiSend />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;