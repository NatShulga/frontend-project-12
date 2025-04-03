import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddChannelModal = ({ show, onHide, onAdd }) => {
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
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название канала</Form.Label>
            <Form.Control
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Введите название"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!channelName.trim()}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
