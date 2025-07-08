import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from '../../store/api/messagesApi.js';
import { removeChannelAsync } from './channelsSlice.js';

const initialState = {
  messages: [],
  status: 'idle',
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    removeMessageRedux(state, action) {
      state.messages = state.messages.filter((msg) => msg.channelId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = true;
        state.errors = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      })
      .addCase(removeChannelAsync.fulfilled, (state, action) => {
        state.messages = state.messages.filter((msg) => msg.channelId !== action.payload);
      });
  },
});

export const { addMessage, removeMessageRedux } = messagesSlice.actions;

export default messagesSlice.reducer;
