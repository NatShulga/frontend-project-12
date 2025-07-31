import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddChannelModal = ({ show, onHide, onAdd }) => {
  const { t } = useTranslation();
  const [channelName, setChannelName] = React.useState('');
  const [error, setError] = React.useState(''); 

  const handleChange = (e) => {
    const value = e.target.value;
  setChannelName(value);

  if (value.length > 20) {
    setError(t('От 3 до 20 символов'));
  } else {
    setError(t('От 3 до 20 символов')); // убираем ошибку, если в пределах нужных символов
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (channelName.length < 3) {
    setError(t('От 3 до 20 символов'));
    return;
  }
  if (channelName.length > 20) {
    // Это чтобы было
    setError(t('От 3 до 20 символов'));
    return;
  }

    try {
      await onAdd(channelName);
      //toast.success(t('Канал создан!', { name: channelName }));
      setChannelName('');
      setError('');
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(t('Ошибка при создании канала'));
      setError(t('Ошибка при создании канала'));
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
            <Form.Label htmlFor="channelName">{t("Название канала")}</Form.Label>
            <Form.Control
              id="channelName"
              type="text"
              value={channelName}
              onChange={handleChange}
              placeholder= {t("Введите название")}
              isInvalid={!!error}
              autoFocus
            />
            {/*<div className="d-flex justify-content-between align-items-center mb-1">
              {channelName && !error && (
                <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {t("От 3 до 20 символов")}
                </Form.Text>
              )}
            </div>*/}

            {/*ошибка валидации */}
            
              <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
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
          disabled={!channelName.trim() || channelName.length < 3 || channelName.length > 20}
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
