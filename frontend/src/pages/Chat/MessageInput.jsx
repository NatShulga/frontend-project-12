import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sendMessageApi } from '../../store/api/messagesApi';
import sendIcon from '../../assets/5064452.svg'; 
import { getCurrentChannelId } from '../../store/slice/channelsSlice';


const MessageInput = () => {
  const {t} = useTranslation();
  const currentChannelId = useSelector(getCurrentChannelId);
  console.log('currentChannelId:', currentChannelId);
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.username);
  const inputRef = React.useRef();

  useEffect(() => {
    if (inputRef.current) {//фиксирует на инпуте при изменении канала при монтировании
      inputRef.current.focus();
  }
}, [currentChannelId]);


  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.message.trim()) {
        errors.message = t('');//не обязательно
      }
      return errors;
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      dispatch(sendMessageApi({
        body: values.message,
        username,
        channelId: currentChannelId,
        timestamp: new Date().toISOString(),
      }))
        .unwrap()
        .then(() => {
          resetForm();
          inputRef.current?.focus();
        })
        .catch((err) => {
          console.error('Ошибка отправки:', err);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div 
      className="message-input-container"
      data-testid="message-input-container"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '10px 15px',
        backgroundColor: '#fff',
        borderTop: '1px solid #eee',
        zIndex: 100,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            ref={inputRef}
            id="message"
            name="message"
            type="text"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t("Введите сообщение...")}
            data-testid="new-message"
            aria-label="Новое сообщение"
            isInvalid={formik.touched.message && !!formik.errors.message}
            style={{
              borderRadius: '20px',
              border: '1px solid #ced4da',
              flex: 1,
            }}
          />
          <Button 
            variant="primary" 
            type="submit"
            disabled={!formik.values.message.trim() || formik.isSubmitting}
            style={{
              borderRadius: '20px',
              marginLeft: '10px',
              backgroundColor: '#4682B4',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', 
            }}
          >
            <img 
              src={sendIcon} 
              alt={t("Отправить")}
              style={{
                width: '20px',
                height: '20px',
                filter: 'brightness(0) invert(1)'
              }}
            />
          </Button>
          {formik.touched.message && formik.errors.message ? (
            <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
              {formik.errors.message}
            </Form.Control.Feedback>
          ) : null}
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageInput;
