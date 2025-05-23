import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/authSlice';
import chatReducer from '../../features/slice/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
  },
});
