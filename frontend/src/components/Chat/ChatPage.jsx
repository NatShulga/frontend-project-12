import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';


const ChatPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [username] = useState(location.state?.username || t('chat.anonymous'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);


  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      author: username,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };

  
  if (!authChecked) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('chat.loading')}</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="g-0 h-100">
      
        <Col md={3} className="bg-light h-100 border-end">
          <ChannelList 
            currentChannel={currentChannel}
            onChangeChannel={setCurrentChannel}
          />
        </Col>

        
        <Col md={9} className="d-flex flex-column h-100">
          {currentChannel ? (
            <>
              <ChatHeader 
                title={currentChannel.name} 
                usersCount={currentChannel.users?.length || 0}
              />
              <MessageList 
                messages={messages.filter(
                  msg => msg.channelId === currentChannel.id
                )} 
              />
              <MessageInput 
                onSend={handleSendMessage}
                placeholder={t('chat.message_placeholder')}
              />
              <Button variant="danger" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <h4>{t('chat.select_channel')}</h4>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;