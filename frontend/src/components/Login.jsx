import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, useNavigation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            passworld: '',
        },
        onSubmit: (values) => {
            //написать логику формы отправки
        }
    })
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit = {
                <button type ='submit'>Login</button>
            }></form>
        </div>
    );
}
export default Login;