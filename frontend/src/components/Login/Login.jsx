import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post('/api/login', values);
                const token = response.data.token;
                localStorage.setItem('token', token);
                toast.success('Успешный вход!');
                navigate('/');
            } catch (err) {
                setError('Неверное имя пользователя или пароль');
                toast.error('Ошибка входа');
            }
        },
    });

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="shadow">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h2>Вход в систему</h2>
                            </div>
                            
                            {error && <Alert variant="danger">{error}</Alert>}
                            
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Ваш ник"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        className="py-2"
                                        style={{ maxWidth: '250px' ,
                                                marginLeft: 'auto',
                                                marginRight: '1px',
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Пароль"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        className="py-2"
                                        style={{ maxWidth: '250px' ,
                                            marginLeft: 'auto',
                                            marginRight: '1px',
                                    }}
                                    />
                                </Form.Group>
                                
                                <div className="d-flex justify-content-end">
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 py-2 mb-3 ms-auto"
                                    style={{ backgroundColor: '#eec111', 
                                        border: 'none',
                                        maxWidth: '250px' ,
                                        
                                    }}
                                >
                                    Войти
                                </Button>
                                </div>

                                <div className="text-center mt-3">
                                    <span className="text-muted">Нет аккаунта? </span>
                                    <Link to="/register" 
                                        className="auth-link text-decoration-none" 
                                        style={{ color: '#eec111'}} 
                                        > Зарегистрируйтесь </Link>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;