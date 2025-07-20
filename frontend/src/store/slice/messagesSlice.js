import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages, sendMessageApi } from "../api/messagesApi.js";
import { removeChannel } from "../api/channelsApi.js";
//import { fetchMessages } from "../api/messagesApi.js";

const initialState = {
  loading: false,
  error: null,
  messages: []
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      //ОТПРАВКА СООБЩЕНИЙ
      .addCase(sendMessageApi.fulfilled, (state, action) => {
        const { channelId, ...messages } = action.payload;
      })

      .addCase(sendMessageApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка отправки сообщения";
      })
      
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.messages = state.messages.filter((msg) => msg.channelId !== action.payload);
      })

      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = (action.payload);
      })
    },
  });

export default messagesSlice.reducer;
