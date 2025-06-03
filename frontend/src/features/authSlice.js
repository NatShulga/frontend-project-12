import { createSlice } from '@reduxjs/toolkit';

//аутентификация пользователя
// Функция для безопасной загрузки текущего состояния авторизации
const loadInitialAuthState = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');


  return {
    token,
    username: username || null, //null, если данных нет
    isAuthenticated: !!token, //авторизован если есть токен
  };
};

// хранение данных авторизации
export const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialAuthState(), // Загружаем начальное состояние
  reducers: {
    // Установка нового токена и данных пользователя
    setAuthToken: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.username = username;
      // Сохраняем токен и профиль пользователя в localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },

    // Удаление токена и данных пользователя
    clearAuthToken: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;

      // Удаляем сохраненные данные из localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },

    restoreAuth: (state) => {
      const username = localStorage.getItem('username');
      if (username) {
        state.username = username;
      }
    }
  },
});

export const { setAuthToken, clearAuthToken, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
