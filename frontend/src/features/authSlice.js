import { createSlice } from '@reduxjs/toolkit';

const loadInitialAuthState = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

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
      state.token = token;
      state.isAuthenticated = true;
      state.username = username;
      state.chatResetFlag = false;

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
      state.username = null;
      state.isAuthenticated = false;
      state.chatResetFlag = true; // Флаг для очистки чата
      
      // Полная очистка localStorage
      localStorage.clear();
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

// Экспорт действий
export const { 
  setAuthToken, 
  softReset,
  logout,  // Заменили hardReset на более понятное название
  restoreAuth 
} = authSlice.actions;

// Селекторы
export const selectChatResetFlag = (state) => state.auth.chatResetFlag;
export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
