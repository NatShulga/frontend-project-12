import { createSlice } from "@reduxjs/toolkit";
import { sendMessageApi, fetchMessages } from "../api/messagesApi.js";
import { removeChannel } from "../api/channelsApi.js";

const initialState = {
  messagesByChannel: {},
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    removeMessageRedux(state, action) {
      state.messages = state.messages.filter((msg) => msg.channelId !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
    //ЗАГРУЗКА СООБЩЕНИЙ
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { channelId, messages } = action.payload;
        state.messagesByChannel[channelId] = messages;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Ошибка загрузки сообщений";
      })
      //ОТПРАВКА СООБЩЕНИЙ
      .addCase(sendMessageApi.fulfilled, (state, action) => {
        const { channelId, ...message } = action.payload;
        
        // Инициализируем этот массив для канала
        if (!state.messagesByChannel[channelId]) {
          state.messagesByChannel[channelId] = [];
        }
        state.messagesByChannel[channelId].push(message);
      })

      .addCase(sendMessageApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка отправки сообщения";
      })
      
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.messages = state.messages.filter((msg) => msg.channelId !== action.payload);
      });

  },
});

export const selectMessagesByChannel = (channelId) => (state) => 
  state.messages.messagesByChannel[channelId] || [];

export const selectMessagesLoading = (state) => state.messages.loading;
export const selectMessagesError = (state) => state.messages.error;


export default messagesSlice.reducer;
