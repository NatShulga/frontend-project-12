import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';


const ChatPage = () => {
  return (
    <Container fluid className="vh-100 p-0">
      <Row className="g-0 h-100">
        <Col md={3} className="bg-light h-100 border-end">
          <ChannelList />
        </Col>
        <Col md={9} className="d-flex flex-column h-100">
          <ChatHeader />
          <MessageList />
          <MessageInput />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;