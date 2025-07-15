import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "../api/messagesApi.js";
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
    removeMessageRedux(state, action) {
      state.messages = state.messages.filter(
        (msg) => msg.channelId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
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

export const { addMessage, removeMessageRedux } = messagesSlice.actions;

export default messagesSlice.reducer;
