import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllChannels, selectCurrentChannel, addChannel, setCurrentChannel } from '../../features/slice/chatSlice';
import AddChannelModal from './AddChannelModal';
import { useTranslation } from 'react-i18next';


const ChannelList = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const channels = useSelector(selectAllChannels) || [];
  const currentChannel = useSelector(selectCurrentChannel);
  
  if (!channels) return <div>Загрузка каналов...</div>;

  return (
    <>
      <div className="d-flex align-items-center mb-3 ps-3 pe-3 bg-light"
      style={{ paddingTop: '20px' }} >
      <h5 className="mb-0 me-2 fw-normal">{t("Каналы")}</h5>
      <Button 
      variant="outline-primary" 
      size="sm" 
      onClick={() => setShowModal(true)}
      className="ms-auto p-0 d-flex align-items-center justify-content-center"
      style={{ 
        width: '23px', 
        height: '23px',
        color: '#4682B4',
        border: '2px solid #4682B4',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        padding: 0,
        lineHeight: 1,
      }}
        >
          <span style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            fontSize: '17px',
            marginTop: '-3px',
            
          }}>
            +
          </span>
        </Button>
      </div>
      
      <ListGroup
      style={{ 
        marginTop: '40px', 

      }}>
        {channels.map(channel => (
          <ListGroup.Item
          key={channel.id}
          active={channel.id === currentChannel?.id}
          onClick={() => dispatch(setCurrentChannel(channel.id))}
          action
          className="channel-item"
          style={{
            backgroundColor: channel.id === currentChannel?.id ? ' 	#4682B4' : '#f8f9fa',
            color: channel.id === currentChannel?.id ? '#fff' : '#333',
            borderLeft: '4px solid ' + (channel.id === currentChannel?.id ? ' 	#4682B4' : 'transparent'),
            transition: 'all 0.3s ease'
          }}
        >
          <div className="d-flex align-items-center w-100 ms-auto">
          # {channel.name}
            {channel.unread > 0 && (
            <span
              className="badge rounded-pill ms-auto p-0 d-flex align-items-center justify-content-center"
              style={{ 
                backgroundColor: channel.id === currentChannel?.id ? '#fff' : '#eec111',
                color: channel.id === currentChannel?.id ? '#eec111' : '#fff',
                width: '23px',
                height: '23px',
                justifyContent: 'center',
                alignItems: 'center',
                lineHeight: 'normal',
                
              }}
            >
              {channel.unread}
            </span>
          )}
          </div>
        </ListGroup.Item>
        ))}
      </ListGroup>

      <AddChannelModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        onAdd={name => dispatch(addChannel(name))}
      />
    </>
  );
};

export default ChannelList;
