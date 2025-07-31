import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/slice/authSlice.js';
import channelsReducer from '../../store/slice/channelsSlice.js';
import messagesReducer from '../../store/slice/messagesSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

