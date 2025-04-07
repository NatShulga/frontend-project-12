import React, { useState, useEffect } from 'react';
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
    const [isMounted, setIsMounted] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const initialFormValues = {
        userName: '',
        password: '',
        confirmPassword: ''
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        enableReinitialize: true,
        validate: values => {
            const errors = {};
            
            if (!values.userName) {
                errors.userName = 'Обязательное поле';
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
        onSubmit: async (values, { resetForm }) => {

            try {
                await axios.post('/api/v1/signup', {
                userName: 'newuser',
                password: '123456'
                });
                
                toast.success('Регистрация прошла успешно!');
                resetForm({ values: initialFormValues });
                navigate('/login');

            } catch (err) {
                if (isMounted) {
                setError(err.response?.data?.message || 'Ошибка регистрации');
                toast.error('Не удалось зарегистрироваться');
                formik.setValues({ 
                    userName: values.userName,
                    password: '', 
                    confirmPassword: '' 
                });
            }
        }
        },
    });

    useEffect(() => {
        setIsMounted(true);
        formik.setValues(initialFormValues, false);
        
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
                                        style={{ maxHeight: '200px' , position: 'relative', top: '20px', left: '15px'}}
                                    />
                                </Col>
                                <div style={{ flex: 1 }}>
                                    <div className="text-center mb-4">
                                        <h2 className="fw-bold">Регистрация</h2>
                                        <p className="text-muted">Создайте новый аккаунт</p>
                                    </div>
                                    
                                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                                    
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <div className="d-flex justify-content-end">
                                                <div style={{ width: '250px' }}>
                                                    <Form.Control
                                                        type="text"
                                                        name="userName"
                                                        placeholder="Имя пользователя"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.nameUser}
                                                        isInvalid={formik.touched.nameUser && !!formik.errors.nameUser}
                                                        autoComplete="off"
                                                    />
                                                    {formik.touched.nameUser && formik.errors.nameUser && (
                                                        <div className="text-danger text-end" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                            {formik.errors.nameUser}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Form.Group>

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
                                                        autoComplete="new-password"
                                                    />
                                                    {formik.touched.password && formik.errors.password && (
                                                        <div className="text-danger text-end" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                            {formik.errors.password}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Form.Group>

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
                                                        autoComplete="new-password"
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
                                                    width: '250px',
                                                    transform: isButtonPressed ? 'translateY(2px)' : 'translateY(0)',
                                                    boxShadow: isButtonPressed 
                                                        ? '0 1px 2px rgba(0,0,0,0.1)' 
                                                        : '0 2px 5px rgba(0,0,0,0.2)',
                                                    transition: 'all 0.1s ease',
                                                }}
                                                disabled={formik.isSubmitting}
                                                onMouseDown={() => setIsButtonPressed(true)}
                                                onMouseUp={() => setIsButtonPressed(false)}
                                                onMouseLeave={() => setIsButtonPressed(false)}
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