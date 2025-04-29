import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllChannels, selectCurrentChannel, addChannel } from '../../features/slice/chatSlice';
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
      <div className="d-flex align-items-center mb-3 ps-3 pe-2 py-2 border-bottom bg-light">
        <h5 className="mb-0 me-2 fw-normal">{t("Каналы")}</h5>
        <Button 
          variant="outline-primary" 
          size="sm" 
          onClick={() => setShowModal(true)}
          className="ms-auto"
          style={{ minWidth: '32px' }}
        >
          +
        </Button>
      </div>
      
      <ListGroup>
        {channels.map(channel => (
          <ListGroup.Item
            key={channel.id}
            active={channel.id === currentChannel?.id}
            onClick={() => dispatch(selectCurrentChannel(channel.id))}
            action
          >
            # {channel.name}
            {channel.unread > 0 && (
            <span 
            className="badge rounded-pill float-end"
            style={{ backgroundColor: '#eec111', color: '#fff' }}
          >
            {channel.unread}
          </span>
            )}
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
