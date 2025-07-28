import * as yup from 'yup';

export const validationSchema = yup.object({
  username: yup
    .string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов')
    .max(20, 'Не более 20 символов'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
});
