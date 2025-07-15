import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RenameChannelModal = ({ show, onHide, channelId, onRename }) => {
  const { t } = useTranslation();
  const [newName, setNewName] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      await onRename(newName);
      toast.success(t('Канал "{{name}}" успешно переименован!', { name: newName }));
      setNewName('');
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(t('Ошибка при переименовании канала'));
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
