import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;