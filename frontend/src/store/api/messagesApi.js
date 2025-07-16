import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`/api/v1/channels/${channelId}/messages`);
      return { channelId, messages: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
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


