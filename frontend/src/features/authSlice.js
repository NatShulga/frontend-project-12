import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  user: null, //изначально пользователь отсутствует
};

try {
  const userData = localStorage.getItem('user');
  if (userData) {
    initialState.user = JSON.parse(userData); // парсим данные пользователя
  }
} catch (err) {
  console.error('Failed to parse user data:', err);
  initialState.user = null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token, user } = action.payload; //установили пользователя и токен

      state.token = token;
      state.user = user; //объект пользователя
      state.isAuthenticated = !!token;
      //исправление сохранения в локалсторидж 
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
