import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';


const fallbackLng = 'en';
const fallbackTranslations = {
  ru: {
    translation: {
      title: 'Hexlet Chat',
      button: {
        login: 'Войти',
      },
      field: {
        username: {
          label: 'Ваш ник',
        },
        password: {
          label: 'Пароль',
        },
      },
      logIn: 'Вход в систему',
      username: 'Имя пользователя',
      password: 'Пароль',
      toast: {
        login: {
          error: 'Неверные имя пользователя или пароль',
        },
        registration: 'Регистрация',
      field: {
      username: {
        label: 'Ваш ник'
      },
      password: {
        label: 'Пароль',
        min: 'Не менее 6 символов',
        max: 'Не более 20 символов'
      },
      confirmPassword: {
        label: 'Подтвердите пароль',
        repeat: 'Пароли должны совпадать'
      }
    },
    button: {
      register: 'Зарегистрироваться',
      registering: 'Регистрация...'
    },
    modal: {
      addChannel: {
        title: 'Добавить канал',
      },
      editChannel: {
        title: 'Переименовать канал',
      },
      removeChannel: {
        titie: 'Вы уверены, что хотите удалить канал?',
      },
    }
      },
    },
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    //debug: process.env.NODE_ENV === 'development',
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
      requestOptions: {
        cache: 'no-store'
      }
    },
    react: {
      useSuspense: false
    },
    resources: fallbackTranslations
  });

export default i18n;
