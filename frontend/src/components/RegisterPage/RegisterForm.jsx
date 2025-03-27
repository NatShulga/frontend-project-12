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
                            <Col md={6} className="">
                                <img src={LoginProsses} alt=""
                                className="img-fluid"
                                style={{ 
                                    maxWidth: '100%', 
                                    height: 'auto',
                                    maxHeight: '200px',
                                    position: 'absolute',
                                    left: '60px',
                                    top: '140px'
                                    }}
                                />
                            </Col>
                        </div>
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Регистрация</h2>
                                <p className="text-muted">Создайте новый аккаунт</p>
                            </div>
                            
                            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                            
                            <Form onSubmit={formik.handleSubmit}>
                                <Row>
                                    <Form.Group className="mb-4">
                                    <div className="d-flex justify-content-end">
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            width: '100%'
                                        }}>
                                            <Form.Control
                                                type="text"
                                                name="nameUser"
                                                placeholder="Имя пользователя"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.nameUser}
                                                isInvalid={formik.touched.nameUser && !!formik.errors.nameUser}
                                                style={{ maxWidth: '250px',
                                                    marginLeft: 'auto',
                                                    marginRight: '1px'
                                                }}
                                                />
                                            <Form.Control.Feedback type="invalid" style={{ 
                                                    marginLeft: 'auto',
                                                    marginRight: '1px' // Сохраняем отступ как у поля
                                                    }}>
                                                {formik.errors.nameUser}
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                        </Form.Group>
                                        
                                    
                                
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Пароль"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        isInvalid={formik.touched.password && !!formik.errors.password}
                                        style={{ maxWidth: '250px' ,
                                            marginLeft: 'auto',
                                            marginRight: '1px',
                                    }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Подтвердите пароль"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                        isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                                        style={{ maxWidth: '250px' ,
                                            marginLeft: 'auto',
                                            marginRight: '1px',
                                    }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 py-2 mb-3"
                                    style={{ backgroundColor: '#eec111', border: 'none',
                                        maxWidth: '250px' ,
                                        marginLeft: 'auto',
                                        marginRight: '12px'
                                    }}
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                                </Button>
                                
                                
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
                                </Row>
                            </Form>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;