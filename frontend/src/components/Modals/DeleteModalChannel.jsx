import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const DeleteChannelModal = ({ show, onHide, channelId, onDelete, channelName }) => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await onDelete(channelId);
      toast.success(t('Канал "{{name}}" успешно удален', { name: channelName }));
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(t('Ошибка при удалении канала'));
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t("Удалить канал")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              {t('Вы уверены, что хотите удалить канал "{{name}}"?', { name: channelName })}
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("Отмена")}
        </Button>
        <Button 
          variant="danger" 
          onClick={handleDelete}
        >
          {t("Удалить")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
