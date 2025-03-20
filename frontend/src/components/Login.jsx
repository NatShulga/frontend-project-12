import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, useNavigation } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            passworld: '',
        },
        onSubmit: async(values) => {
            try {
                const response = await axios.post('/api/login', values); // Отправляем данные на сервер
                const token = response.data.token; // если ответ от сервера соответствует верному(логин и пароль), то получаем токен
        
                localStorage.setItem('token', token); // Сохраняем токен в локалсторидже
                navigate('/'); // Редирект на главную страницу
            } catch (err) {
                console.error('Ошибка авторизации:', err);
                setError('Неверное имя пользователя или пароль.'); // Сообщение об ошибке
            }
            },
        });
        
        return (
            <div className="container">
              <h2>Login</h2>
              {error && <Alert variant="danger">{error}</Alert>} {/* Отображаем сообщение об ошибке */}
              <Form onSubmit={formik.handleSubmit}> {/* Подключаем formik.handleSubmit к форме */}
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
        
                <Button variant="primary" type="submit"> {/* Добавляем кнопку submit внутри формы */}
                  Login
                </Button>
              </Form>
            </div>
          );
        }
export default Login;
