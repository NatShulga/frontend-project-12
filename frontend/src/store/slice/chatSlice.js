import { createSlice } from '@reduxjs/toolkit';
//import { removeChannel } from '../../store/api/channelsApi';
//import { sendMessageApi } from '../../store/api/messagesApi';

const initialState = {
  currentChannelId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    }
  }
});

// Селекторы сообщений
//export const selectAllMessages = (state) => state.chat.data || [];
export const selectMessagesLoading = (state) => state.chat.loading;
export const selectMessagesError = (state) => state.chat.error;

//export const selectCurrentMessages = (state) => {
//state.messages[getCurrentChannelId]?.map(message => message) || [];
//};

export const getCurrentChannelId = (state) => state.chat.currentChannelId;

export const { clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
