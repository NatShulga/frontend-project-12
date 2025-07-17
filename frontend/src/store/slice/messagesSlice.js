import { createSlice } from "@reduxjs/toolkit";
import { sendMessageApi, fetchMessages } from "../api/messagesApi.js";
import { removeChannel } from "../api/channelsApi.js";

const initialState = {
  messages: [], //меняем массив на объект
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},

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
        state.messages[channelId] = messages;
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
        if (!state.messages[channelId]) {
          state.messages[channelId] = [];
        }
        
        // Добавляем сообщение в нужный канал
        state.messages[channelId].push(message);
        state.loading = false;
      })
      .addCase(sendMessageApi.rejected, (state, action) => {
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

//export const { sendMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
