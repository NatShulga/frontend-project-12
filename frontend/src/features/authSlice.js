import { createSlice } from '@reduxjs/toolkit';

// Функция для безопасной загрузки текущего состояния авторизации
const loadInitialAuthState = () => {
  const token = localStorage.getItem('token');
  let user = null;

  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData); // Безопасный парсинг
    }
  } catch (err) {
    console.error('Ошибка при парсинге данных пользователя:', err);
    // При ошибке очищаем невалидные данные
    localStorage.removeItem('user');
  }

  return {
    token,
    user, // Или null, если данных нет
    isAuthenticated: !!token // Явное преобразование в boolean
  };
};

// хранение данных авторизации
export const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialAuthState(), // Загружаем начальное состояние
  reducers: {
    // Установка нового токена и данных пользователя
    setAuthToken: (state, action) => {
      const { token, user } = action.payload;

      // Валидация входящего payload
      if (typeof token !== 'string' || !token.trim()) {
        console.error('Invalid token provided');
        return;
      }

      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      // Сохраняем токен и профиль пользователя в localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },

    // Удаление токена и данных пользователя
    clearAuthToken: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Удаляем сохраненные данные из localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    // Обновление некоторых полей пользователя
    updateUserData: (state, action) => {
      if (!state.token || !action.payload) return;

      state.user = {
        ...state.user,
        ...action.payload
      };

      try {
        localStorage.setItem('user', JSON.stringify(state.user));
      } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
      }
    }
  },
});


export const { setAuthToken, clearAuthToken, updateUserData } = authSlice.actions;
export default authSlice.reducer;
