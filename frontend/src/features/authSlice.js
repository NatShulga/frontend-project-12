import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload;
      localStorage.setItem('token', action.payload);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;