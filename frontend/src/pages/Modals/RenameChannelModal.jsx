import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenameChannelModal = ({ show, onHide, onRename }) => {
  const { t } = useTranslation();
  const [newName, setNewName] = React.useState('');
  const [error, setError] = React.useState('');

React.useEffect(() => {
    if (show) {
      setNewName('');
      setError('');
    }
  }, [show]);

    const handleChange = (e) => {
    const value = e.target.value;
    setNewName(value);

    if (value.length > 20) {
      setError(t('От 3 до 20 символов'));
    } 
    
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = newName.trim();

  if (trimmedName.length < 3) {
    setError(t('От 3 до 20 символов'));
    return;
  }
  if (newName.length > 20) {
    setError(t('От 3 до 20 символов'));
    return;
  }

    try {
      await onRename(trimmedName);
      toast.success(t('Канал переименован!'));
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(t('errors.channelRenameError'));
      setError(t('errors.channelRenameError'));
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
            <Form.Label htmlFor="renameChannelInput">{t('Имя канала')}</Form.Label>
            <Form.Control
              id="renameChannelInput"
              type="text"
              value={newName}
              onChange={handleChange}
              placeholder={t("Введите новое название")}
              isInvalid={!!error}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
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
          disabled={!newName.trim() || newName.length < 3 || newName.length > 20}
          style={{
            backgroundColor: '#4682B4',
            border: '2px solid #4682B4',
            borderRadius: '4px',
          }}
        >
          {t("Переименовать")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;
