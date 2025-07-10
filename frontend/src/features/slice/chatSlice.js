import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from '../../store/api/channelsApi';
import { sendMessage } from '../../store/api/messagesApi';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.data.push(action.payload);
    },
    clearMessages: (state) => {
      state.data = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.data = state.data.filter(msg => msg.channelId !== id);
      });
  }
});

// Селекторы сообщений
export const selectAllMessages = (state) => state.chat.data || [];
export const selectMessagesLoading = (state) => state.chat.loading;
export const selectMessagesError = (state) => state.chat.error;

export const selectCurrentMessages = (state) => {
  const messages = selectAllMessages(state);
  const currentChannelId = state.channels.currentChannelId;
  return currentChannelId 
    ? messages.filter(m => m.channelId === currentChannelId)
    : [];
};

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
