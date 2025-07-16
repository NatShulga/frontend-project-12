import { createSlice } from "@reduxjs/toolkit";
import { sendMessage, fetchMessages } from "../api/messagesApi.js";
import { removeChannel } from "../api/channelsApi.js";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.messages = action.payload;
        state.error = null;
      })
      
      .addCase(sendMessage.fulfilled, (state, action) => {
        //сохранение сообщений в списке
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка отправки сообщения";
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const channelId = action.payload.id;
        state.messages = state.messages.filter(
          (msg) => msg.channelId !== channelId
        );
      });
  },
});

export const selectCurrentMessages = (state) => state.messages.messages;
export const selectMessagesLoading = (state) => state.messages.loading;

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
