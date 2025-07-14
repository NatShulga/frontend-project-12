import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/channels/${channelId}/messages`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId, username }, { getState, rejectWithValue }) => {
    const { auth } = getState();

if (!auth.token) {
      return rejectWithValue({ message: 'Нет действительного токена' }); // отклоняем выполнение с соответствующим сообщением
    }

try {
    const response = await axios.post('/api/v1/messages', { body, channelId, username }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Ошибка при отправке сообщения' });
    }
  }
);

export const removeMessage = async (messageId, token) => {
  try {
    const response = await axios.delete(`/api/v1/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Ошибка при удалении сообщения', err);
    throw err;
  }
};
