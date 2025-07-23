import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import LoginProsses from '@/assets/LoginProsses.jpg';

function RegisterPage() {
    const location = useLocation();
        console.log(location.pathname);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    const initialFormValues = {
        username: '',
        password: '',
        confirmPassword: ''
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        enableReinitialize: true,
        validate: values => {
            const errors = {};
            
            if (!values.username) {
                errors.username = t('Обязательное поле');
            } 
            
            if (!values.password) {
                errors.password = t('Обязательное поле');
            } else if (values.password.length < 6) {
                errors.password = t('Пароль должен быть не менее 6 символов');
            }
            
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = t('Пароли не совпадают');
            }
            
            return errors;
        },

        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true); //активируется загрузка
            setError('');
            try {
                //здесь у нас данный отправляются на рег-ию
                const res = await axios.post('/api/v1/signup', {
                    username: values.username,
                    password: values.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                }
                });

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);


                toast.success(t('Регистрация и вход выполнены!'));
                navigate('/');

        } catch (err) {
                toast.error(t('Ошибка регистрации'));
        } finally {
            setIsLoading(false); //выкл загрузки
        }
        },
    });

    useEffect(() => {
    setIsMounted(true);
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
                                        alt={t("Процесс регистрации")}
                                        className="img-fluid rounded"
                                        style={{ maxHeight: '200px' , position: 'relative', top: '20px', left: '15px'}}
                                    />
                                </Col>
                                <div style={{ flex: 1 }}>
                                    <div className="text-center mb-0,5">
                                        <h2 className="fw-bold">{t("Регистрация")}</h2>
                                        <p className="text-muted">{t("")}</p>
                                    </div>
                                    
                                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                                    
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Form.Group className="mb-0,5">
                                            <div className="d-flex justify-content-end">
                                                <div style={{ width: '250px' }}>
                                                    <Form.Label htmlFor="username">{t("")}</Form.Label>
                                                    <Form.Control
                                                        id= "username"
                                                        type="text"
                                                        name="username"
                                                        placeholder={t("Имя пользователя")}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.username}
                                                        isInvalid={formik.touched.username && !!formik.errors.username}
                                                        autoComplete="off"
                                                    />
                                                    {formik.touched.username && formik.errors.username && (
                                                        <div className="text-danger text-end" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                            {formik.errors.username}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-0,5">
                                            <div className="d-flex justify-content-end">
                                                <div style={{ width: '250px' }}>
                                                    <Form.Label htmlFor="password">{t("")}</Form.Label>
                                                    <Form.Control
                                                        id= "password"
                                                        type="password"
                                                        name="password"
                                                        placeholder={t("Пароль")}
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
                                                    <Form.Label htmlFor="confirmPassword">{t("")}</Form.Label>
                                                    <Form.Control
                                                        id= "confirmPassword"
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder={t("Подтвердите пароль")}
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
                                                className="py-2 mb-4"
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
                                                aria-label={t('Регистрация')}
                                            >
                                                {formik.isSubmitting ? t('Регистрация...') : t('Регистрация')}
                                            </Button>
                                        </div>

                                        <div className="text-center mt-1">
                                            <span className="text-muted">{t("Уже есть аккаунт?")} </span>
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
