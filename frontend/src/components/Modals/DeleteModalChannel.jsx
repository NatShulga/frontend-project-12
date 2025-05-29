import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

const DeleteChannelModal = ({ show, onHide, channelId, onDelete }) => {
  const { t } = useTranslation();
  const [newName, setNewName] = React.useState('');

  const handleDelete = async () => {
    try {
      await onDelete(channelId);
      toast.success(t('Канал успешно удален'));
      onHide();
    } catch (err) {
      toast.error(t('Ошибка при удалении канала'));
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Удалить канал")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
            <Form.Group className="mb-3">
              <Form.Label>{t("Вы уверены, что хотите удалить этот канал?")}</Form.Label>
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
      <ToastContainer />
    </>
  );
};

export default DeleteChannelModal;
