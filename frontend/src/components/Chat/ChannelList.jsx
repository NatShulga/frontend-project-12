import React, { useEffect } from 'react';
import { ListGroup, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectAllChannels, selectCurrentChannel, setCurrentChannel } from '../../features/slice/chatSlice';
import { fetchChannels, addChannel, removeChannel, editChannel } from '../../store/api/channelsApi';
import { selectChannelsLoading, selectChannelsError } from '../../features/slice/chatSlice';
import AddChannelModal from '../Modals/AddChannelModal';
import { useTranslation } from 'react-i18next';
import RenameChannelModal from '../Modals/RenameChannelModal';
import DeleteChannelModal from '../Modals/DeleteChannelModal';

const ChannelList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [showRenameModal, setShowRenameModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [currentChannelId, setCurrentChannelId] = React.useState(null);
  const channels = useSelector(selectAllChannels) || [];
  const currentChannel = useSelector(selectCurrentChannel);
  const loading = useSelector(selectChannelsLoading);
  const error = useSelector(selectChannelsError);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(fetchChannels(token))
      .unwrap()
      .catch(err => {
        console.error('Ошибка загрузки каналов:', err);
        toast.error(t('Ошибка загрузки каналов'));
      });
  }
}, [dispatch, t]);

  const handleRename = (channelId) => {
    setCurrentChannelId(channelId);
    setShowRenameModal(true);
  };

  const handleDelete = async (channelId) => {
  if (window.confirm(t('Вы уверены, что хотите удалить канал?'))) {
    try {
      await dispatch(removeChannel(channelId));
      toast.success(t('Канал успешно удалён'));
    } catch (err) {
      toast.error(t('Ошибка при удалении канала'));
    }
  }
};
  
  const handleConfirmDelete = async () => {
  const token = localStorage.getItem('token');
  try {
    await dispatch(removeChannel({ channelId: currentChannelId, token }));
    toast.success(t('Канал успешно удалён'));
    setShowDeleteModal(false);
  } catch (err) {
    toast.error(t('Ошибка при удалении канала'));
  }
};

  if (channels.length === 0) {
    return <div className="p-3">{t('Загрузка каналов...')}</div>;
  }

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
  {channels.map((channel) => (
    <button
      key={channel.id}
      className={`channel-item d-flex justify-content-between align-items-center list-group-item ${channel.id === currentChannel?.id ? 'active' : ''}`}
      onClick={() => dispatch(setCurrentChannel(channel.id))}
      style={{
        backgroundColor: channel.id === currentChannel?.id ? '#4682B4' : '#f8f9fa',
        color: channel.id === currentChannel?.id ? '#fff' : '#333',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,.125)',
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
        borderLeftColor: channel.id === currentChannel?.id ? '#4682B4' : 'transparent',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1.25rem',
        marginBottom: '-1px',
        border: '1px solid rgba(0,0,0,.125)'
      }}
    >
      <div className="d-flex align-items-center">
        # {channel.name}
      </div>

      {channel.name !== 'general' && channel.name !== 'random' && (
        <Dropdown onClick={(e) => e.stopPropagation()}>
          <Dropdown.Toggle
            as={Button}
            variant="link"
            id={`dropdown-actions-${channel.id}`}
            className="p-0 text-muted"
            style={{
              color: channel.id === currentChannel?.id ? 'rgba(255,255,255,0.7)' : '#6c757d',
              background: 'none',
              border: 'none',
              boxShadow: 'none'
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
      )}
    </button>
  ))}
</ListGroup>

      <RenameChannelModal 
        show={showRenameModal}
        onHide={() => setShowRenameModal(false)}
        channelId={currentChannelId}
        onRename={async (newName) => {
          try {
            await dispatch(renameChannel({ 
              id: currentChannelId, 
              name: newName 
            })).unwrap();
            setShowRenameModal(false);
          } catch (err) {
            console.error('Rename error:', err);
          }
        }}
      />

      <DeleteChannelModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleConfirmDelete}
        channelName={channels.find(c => c.id === currentChannelId)?.name || ''}
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
