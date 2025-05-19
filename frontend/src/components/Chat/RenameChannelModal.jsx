import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RenameChannelModal = ({ show, onHide, channelId, onRename }) => {
  const { t } = useTranslation();
  const [newName, setNewName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      onRename(newName.trim());
      setNewName('');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t("Переименовать канал")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t("Новое название")}</Form.Label>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t("Введите новое название")}
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
          disabled={!newName.trim()}
        >
          {t("Переименовать")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;
