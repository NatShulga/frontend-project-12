import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth; // Достаем токен из state
      
      // Запрос к серверу
      const response = await axios.get(`/api/v1/channels/${channelId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`, // Показываем ключ (токен)
        },
      });
      
      return { channelId, messages: response.data }; // Возвращаем данные для Redux
    } catch (err) {
      // Если сломалось — возвращаем ошибку
      return rejectWithValue({
        message: 'Не удалось загрузить сообщения',
        error: err.response?.data?.message || err.message,
      });
    }
  }
);

export const sendMessageApi = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId, username }, { getState }) => {
    const { auth } = getState();
    const response = await axios.post('/api/v1/messages', { body, channelId, username }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  },
);


