import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            passworld: '',
        },
        onSubmit: async(values) => {
            try {
                const response = await axios.post('/api/login', values); // Отправляем данные на сервер
                const token = response.data.token; // если ответ от сервера соответствует верному(логин и пароль), то получаем токен
        
                localStorage.setItem('token', token);
                toast.success('Урааа, вы успешно вошли!'); // Сохраняем токен в локалсторидже
                navigate('/'); // Редирект на главную страницу
            } catch (err) {
                console.error('Ошибка авторизации:', err);
                setError('Неверное имя пользователя или пароль.');
                toast.error('Уппс, пожалуйста, попробуйте еще раз.'); // Сообщение об ошибке
            }
            },
        });
        
        return (
          <div className="container">
              <h2>Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Введите имя пользователя"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </Form.Group>
        
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Form.Group>
        
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          );
      };
export default Login;
