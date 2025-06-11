import { createSlice } from '@reduxjs/toolkit';

//аутентификация пользователя
// Функция для безопасной загрузки текущего состояния авторизации
const loadInitialAuthState = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  //const dispatch = resetChat();
  return {
    token,
    username: username || null, //null, если данных нет
    isAuthenticated: !!token, //авторизован если есть токен
    chatResetFlag: false // Флаг для сброса чата
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
      state.chatResetFlag = false; // Сбрасываем флаг при новой авторизации

      // Сохраняем токен и профиль пользователя в localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    resetChat: () => initialState,
    

    // Удаление токена и данных пользователя
    clearAuthToken: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;

      // Удаляем сохраненные данные из localStorage
      localStorage.clear();
      //localStorage.removeItem('token');
      //localStorage.removeItem('username');
    },

    //Сброс только состояния чата
    softReset: (state) => {
      state.chatResetFlag = true; // Устанавливаем флаг для сброса чата
      // Токен и username остаются!
    },

    //полный сброс
    hardReset: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      state.chatResetFlag = true;
      
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },

    restoreAuth: (state) => {
      const username = localStorage.getItem('username');
      if (username) {
        state.username = username;
        state.isAuthenticated = !!localStorage.getItem('token');
      }
    }
  },
});

export const { setAuthToken, softReset,  hardReset, restoreAuth } = authSlice.actions;

export const selectChatResetFlag = (state) => state.auth.chatResetFlag;

export default authSlice.reducer;
