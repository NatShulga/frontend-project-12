import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddChannelModal = ({ show, onHide, onAdd }) => {
  const {t} = useTranslation();
  const [channelName, setChannelName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (channelName.trim()) {
      onAdd(channelName.trim());
      setChannelName('');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t("Добавить канал")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t("Название канала")}</Form.Label>
            <Form.Control
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder= {t("Введите название")}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("Отмена")}
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!channelName.trim()}
          className='custom-modal-color'
          style = {{
            backgroundColor: " #4682B4",
            border: '2px solid #4682B4',
            borderRadius: '4px',
        }}
        >
          {t("Добавить канал")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
