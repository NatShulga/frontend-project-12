import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginProsses from '@/assets/LoginProsses.jpg';

function RegisterPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            nameUser: '',
            password: '',
            confirmPassword: ''
        },
        validate: values => {
            const errors = {};
            
            if (!values.nameUser) {
                errors.nameUser = 'Обязательное поле';
            } 
            
            if (!values.password) {
                errors.password = 'Обязательное поле';
            } else if (values.password.length < 6) {
                errors.password = 'Пароль должен быть не менее 6 символов';
            }
            
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Пароли не совпадают';
            }
            
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await axios.post('/api/register', {
                    nameUser: values.nameUser,
                    password: values.password
                });
                
                toast.success('Регистрация прошла успешно!');
                navigate('/login');
            } catch (err) {
                setError(err.response?.data?.message || 'Ошибка регистрации');
                toast.error('Не удалось зарегистрироваться');
            }
        },
    });

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-5">
                            <div className="d-flex align-items-start">
                                <Col md={6} className="d-none d-md-block pe-4">
                                    <img 
                                        src={LoginProsses} 
                                        alt="Процесс регистрации"
                                        className="img-fluid rounded"
                                        style={{ 
                                            maxHeight: '200px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Col>
                                <div style={{ flex: 1 }}>
                                    <div className="text-center mb-4">
                                        <h2 className="fw-bold">Регистрация</h2>
                                        <p className="text-muted">Создайте новый аккаунт</p>
                                    </div>
                                    
                                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                                    
                                    <Form onSubmit={formik.handleSubmit}>
                                        {/* Поле имени пользователя */}
                                        <Form.Group className="mb-3">
                                            <div className="d-flex justify-content-end">
                                                <div style={{ width: '250px' }}>
                                                    <Form.Control
                                                        type="text"
                                                        name="nameUser"
                                                        placeholder="Имя пользователя"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.nameUser}
                                                        isInvalid={formik.touched.nameUser && !!formik.errors.nameUser}
                                                    />
                                                    {formik.touched.nameUser && formik.errors.nameUser && (
                                                        <div className="text-danger text-end" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                            {formik.errors.nameUser}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Form.Group>

                                        {/* Поле пароля */}
                                        <Form.Group className="mb-3">
                                            <div className="d-flex justify-content-end">
                                                <div style={{ width: '250px' }}>
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        placeholder="Пароль"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        isInvalid={formik.touched.password && !!formik.errors.password}
                                                    />
                                                    {formik.touched.password && formik.errors.password && (
                                                        <div className="text-danger text-end" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                            {formik.errors.password}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Form.Group>

                                        {/* Подтверждение пароля */}
                                        <Form.Group className="mb-4">
                                            <div className="d-flex justify-content-end">
                                                <div style={{ width: '250px' }}>
                                                    <Form.Control
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder="Подтвердите пароль"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.confirmPassword}
                                                        isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                                                    />
                                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                        <div className="text-danger text-end" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                            {formik.errors.confirmPassword}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <div className="d-flex justify-content-end">
                                            <Button 
                                                variant="primary" 
                                                type="submit" 
                                                className="py-2 mb-3"
                                                style={{ 
                                                    backgroundColor: '#eec111', 
                                                    border: 'none',
                                                    width: '250px'
                                                }}
                                                disabled={formik.isSubmitting}
                                            >
                                                {formik.isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                                            </Button>
                                        </div>

                                        <div className="text-center mt-3">
                                            <span className="text-muted">Уже есть аккаунт? </span>
                                            <Link 
                                                to="/login" 
                                                className="auth-link text-decoration-none fw-bold" 
                                                style={{color: "#eec111"}}
                                            >
                                                Войти
                                            </Link>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;