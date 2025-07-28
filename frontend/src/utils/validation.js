import { object, string, ref } from 'yup';

export const createChannelValidationSchema = (channelNames, t) => object({
  name: string()
    .matches(/^\S.*\S$/, t('field.mixed.required')) // Не допускает пробелы в начале/конце
    .min(3, t('field.name.min'))
    .max(20, t('field.name.max'))
    .notOneOf(channelNames, t('field.name.uniq')) // Проверка на уникальность
    .required(t('field.mixed.required')),
});

export const createSignUpValidationSchema = (t) => object().shape({
  username: string()
    .required(t('Обязательное поле'))
    .min(3, t('От 3 до 20 символов'))
    .max(20, t('От 3 до 20 символов')),
  password: string()
    .required(t('Обязательное поле'))
    .min(6, t('Пароль должен быть не менее 6 символов'))
    .max(20, t('Пароль должен быть не более 20 символов')),
  confirmPassword: string()
    .required(t('Обязательное поле'))
    .oneOf([ref('password')], t('Пароли должны совпадать')),
});
