import React from 'react';
import { ListGroup, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllChannels, selectCurrentChannel, addChannel, setCurrentChannel, removeChannel, renameChannel } from '../../features/slice/chatSlice';
import AddChannelModal from './AddChannelModal';
import { useTranslation } from 'react-i18next';
import RenameChannelModal from './RenameChannelModal';

const ChannelList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [showRenameModal, setShowRenameModal] = React.useState(false);
  const [currentChannelId, setCurrentChannelId] = React.useState(null);
  const channels = useSelector(selectAllChannels) || [];
  const currentChannel = useSelector(selectCurrentChannel);


    const handleRename = (channelId) => {
    setCurrentChannelId(channelId);
    setShowRenameModal(true);
  };

  const handleDelete = (channelId) => {
    if (window.confirm(t('Вы уверены, что хотите удалить канал?'))) {
      dispatch(removeChannel(channelId));
    }
  };
  
  if (!channels) return <div>Загрузка каналов...</div>;

  return (
    <>
      <div className="d-flex align-items-center mb-3 ps-3 pe-3 bg-light"
        style={{ paddingTop: '20px' }}>
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
      
      <ListGroup style={{ marginTop: '40px' }}>
        {channels.map(channel => (
          <ListGroup.Item
            key={channel.id}
            active={channel.id === currentChannel?.id}
            onClick={() => dispatch(setCurrentChannel(channel.id))}
            action
            className="channel-item d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: channel.id === currentChannel?.id ? '#4682B4' : '#f8f9fa',
              color: channel.id === currentChannel?.id ? '#fff' : '#333',
              borderLeft: '4px solid ' + (channel.id === currentChannel?.id ? '#4682B4' : 'transparent'),
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            <div className="d-flex align-items-center">
              # {channel.name}
            </div>

          
            <Dropdown onClick={(e) => e.stopPropagation()}>
              <Dropdown.Toggle 
                variant="link" 
                id={`dropdown-actions-${channel.id}`}
                className="p-0 text-muted"
                style={{
                  color: channel.id === currentChannel?.id ? 'rgba(255,255,255,0.7)' : '#6c757d'
                }}
              >
                <i className="bi bi-three-dots-vertical"></i>
              </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleRename(channel.id)}>
                    <i className="bi bi-pencil me-2"></i>
                    {t("Переименовать")}
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => handleDelete(channel.id)}
                    className="text-danger"
                  >
                    <i className="bi bi-trash me-2"></i>
                    {t("Удалить")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            
          </ListGroup.Item>
        ))}
      </ListGroup>

      <RenameChannelModal 
        show={showRenameModal}
        onHide={() => setShowRenameModal(false)}
        channelId={currentChannelId}
        onRename={(newName) => {
          dispatch(renameChannel({ id: currentChannelId, name: newName }));
          setShowRenameModal(false);
        }}
      />


      <AddChannelModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        onAdd={name => dispatch(addChannel(name))}
      />
    </>
  );
};

export default ChannelList;
