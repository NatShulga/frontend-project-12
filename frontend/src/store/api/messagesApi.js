import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const sendMessageApi = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId }, { getState }) => {
    const { auth } = getState();
    const response = await axios.post('/api/v1/messages', { body, channelId, username: auth.username }, {//username из auth, а не из параметра
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  },
);


export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { getState }) => {
    console.log(111)
    const { auth } = getState();
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  },
);
