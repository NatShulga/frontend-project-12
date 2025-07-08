import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import { selectCurrentChannel, selectCurrentMessages, addMessage } from '../../features/slice/chatSlice';
import ChatComponent from './ChatComponent';
import { fetchChannels } from '../../store/api/channelsApi';
import { toast } from 'react-toastify'; // Для уведомлений


const ChatPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const [messages,setMessages] = useState([]);
  
  
  const currentChannel = useSelector(selectCurrentChannel);
  //const messages = useSelector(selectCurrentMessages);
  const username = useSelector(state => state.auth.username); 
  const socketRef = useRef(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setAuthChecked(true);
      dispatch(fetchChannels());
    }
  }, [navigate]);

  const handleSendMessage = (text) => {
    if (!text.trim() || !currentChannel) return;

    const newMessage = {
      id: Date.now(),
      text,
      username: username,
      timestamp: new Date().toISOString(),
      channelId: currentChannel.id,
    };
    dispatch(addMessage(newMessage));
  };

  return (
    <Container fluid className="vh-90 d-flex justify-content-center align-items-center mt-3">
      <div 
        className="d-flex rounded shadow-lg" 
        style={{
          width: '90%',
          maxWidth: '1200px',
          height: '80vh',
          backgroundColor: 'white',
          top: '70px',
        }}
      >
        <Row className="g-0 h-100 w-100">
          <Col md={3} className="h-100 border-end bg-light">
            <ChannelList />
          </Col>

          <Col md={9} className="d-flex flex-column h-100 position-relative">
            {currentChannel ? (
              <>
                <ChatHeader 
                  title={currentChannel.name} 
                  usersCount={currentChannel.users?.length || 0}
                />
                <MessageList messages={messages} />
                <MessageInput 
                  onSend={handleSendMessage}
                  placeholder={t('chat.message_placeholder')}
                />
                <ChatContainer 
                  currentChannel={currentChannel}
                  username={username}
                />
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100">
                <h4 style={{ color: '#a0a0a0' }}>{t('Выберите канал')}</h4>
              </div>
            )}
          </Col>
        </Row>
        <ChatComponent />
      </div>
    </Container>
  );
};

export default ChatPage;
