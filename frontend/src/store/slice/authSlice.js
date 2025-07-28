import { createSlice } from '@reduxjs/toolkit';

const loadInitialAuthState = () => {
  const token = localStorage.getItem('token') || null;
  const username = localStorage.getItem('username') || null;

  return {
    token,
    username: username || null,
    isAuthenticated: !!token,
    chatResetFlag: false
  };
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialAuthState(),
  reducers: {
    setAuthToken: (state, action) => {
      const { token, username } = action.payload;

      localStorage.removeItem('token');
      //localStorage.removeItem('username');

      state.token = token;
      state.isAuthenticated = true;
      state.username = username;//новое имя
      state.chatResetFlag = false;

      //очистка старых данных
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },

    // Сброс только чата (без выхода)
    softReset: (state) => {
      state.chatResetFlag = true;
    },

    // Полный выход с очисткой чата
    logout: (state) => {
      state.token = null;
      state.username = null;//сброс имени
      state.isAuthenticated = false;
      state.chatResetFlag = true; // Флаг для очистки чата
      
      // Полная очистка localStorage
      localStorage.clear();
    },

    restoreAuth: (state) => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (token && username) {
    state.token = token;
    state.username = username;
    state.isAuthenticated = true;
  } else {
    state.isAuthenticated = false;
    state.username = null;
  }
    }
  },
});

// Экспорт действий
export const { 
  setAuthToken, 
  softReset,
  logout,
  restoreAuth 
} = authSlice.actions;

// Селекторы
export const selectChatResetFlag = (state) => state.auth.chatResetFlag;
export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
