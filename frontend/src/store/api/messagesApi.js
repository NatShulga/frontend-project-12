import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { getState }) => {
  const { token } = getState().auth;
    const response = await axios.get('/api/v1/messages', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
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
