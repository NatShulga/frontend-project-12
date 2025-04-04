import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bingo from '@/assets/Bingo.jpg';
import api from '../../services/api';


function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await api.post('/api/v1/login', {
                    username: values.username,
                    password: values.password
                });
                
                const { token } = response.data;
                    localStorage.setItem('token', token);
                toast.success('Успешный вход!');
                resetForm({ values: { username: '', password: '' } });
                navigate('/chat');
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'Ошибка сервера';
                setError(errorMessage);
                toast.error(`Ошибка входа: ${errorMessage}`);
                formik.setFieldValue('password', '');
            }
        },
    });

    useEffect(() => {
        setIsMounted(true);
        formik.setValues({ username: '', password: '' }, false); // Второй параметр - не валидировать!!
        
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                document.querySelectorAll('input').forEach(input => {
                    input.value = '';
                });
            }, 100);
        }
        
        return () => setIsMounted(false);
    }, []);

    
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
            <Row className="w-100">
                <Col md={6} lg={6} className="mx-auto">
                    <Card className="shadow">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <h2>Вход в систему</h2>
                            </div>
                            
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={formik.handleSubmit}>
                                <div className="d-flex align-items-start">
                                    <Col md={6} className="">
                                        <img 
                                            src={Bingo} 
                                            alt=""
                                            className="img-fluid"
                                            style={{ 
                                                maxWidth: '100%', 
                                                height: 'auto',
                                                maxHeight: '200px',
                                                position: 'absolute',
                                                left: '20px',
                                            }}
                                        />
                                    </Col>
                                </div>
                                
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Ваш ник"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        className="py-2"
                                        style={{ 
                                            maxWidth: '250px',
                                            marginLeft: 'auto',
                                            marginRight: '1px',
                                        }}
                                        autoComplete="off"
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
                                        style={{ 
                                            maxWidth: '250px',
                                            marginLeft: 'auto',
                                            marginRight: '1px',
                                        }}
                                        autoComplete="new-password"
                                    />
                                </Form.Group>
                                
                                <div className="d-flex justify-content-end">
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 py-2 mb-3 ms-auto"
                                    style={{ 
                                    backgroundColor: '#eec111',
                                    border: 'none',
                                    maxWidth: '250px',
                                    transform: isButtonPressed ? 'translateY(2px)' : 'translateY(0)',
                                    boxShadow: isButtonPressed 
                                        ? '0 1px 2px rgba(0,0,0,0.1)' 
                                        : '0 2px 5px rgba(0,0,0,0.2)',
                                    transition: 'all 0.1s ease',
                                    }}
                                    onMouseDown={() => setIsButtonPressed(true)}
                                    onMouseUp={() => setIsButtonPressed(false)}
                                    onMouseLeave={() => setIsButtonPressed(false)}
                                >
                                    Войти
                                </Button>
                                </div>

                                <div className="text-center mt-3">
                                    <span className="text-muted">Нет аккаунта? </span>
                                    <Link 
                                        to="/register" 
                                        className="auth-link text-decoration-none" 
                                        style={{ color: '#eec111'}}
                                    >
                                        Зарегистрируйтесь
                                    </Link>
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