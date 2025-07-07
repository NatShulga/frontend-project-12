import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/authSlice';
import chatReducer from '../../features/slice/chatSlice';
import channelsReducer from '../../features/slice/channelsSlice';
import messagesReducer from '../../features/slice/messagesSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
