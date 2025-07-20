import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


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


export const fetchMessages = createAsyncThunk(
  'messages/fetchMessage',
  async (... { getState }) => {
    const { auth } = getState();
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  },
);
