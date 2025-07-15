import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/slice/authSlice.js';
import chatReducer from '../../store/slice/chatSlice.js';
import channelsReducer from '../../store/slice/channelsSlice.js';
import messagesReducer from '../../store/slice/messagesSlice.js';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
