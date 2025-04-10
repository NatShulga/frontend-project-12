import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllChannels, selectCurrentChannel, setCurrentChannel, addChannel } from '../../features/slice/chatSlice';
import AddChannelModal from './AddChannelModal';
import { useTranslation } from 'react-i18next';


const ChannelList = () => {
  const {t} = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const channels = useSelector(selectAllChannels);
  const currentChannel = useSelector(selectCurrentChannel);


  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>{t("Каналы")}</h5>
        <Button variant="outline-primary" size="sm" onClick={() => setShowModal(true)}>
          + 
        </Button>
      </div>
      
      <ListGroup>
        {channels.map(channel => (
          <ListGroup.Item
            key={channel.id}
            active={channel.id === currentChannel?.id}
            onClick={() => dispatch(setCurrentChannel(channel.id))}
            action
          >
            # {channel.name}
            {channel.unread > 0 && (
              <span className="badge bg-primary rounded-pill float-end">
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
