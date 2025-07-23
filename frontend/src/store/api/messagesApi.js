import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const sendMessageApi = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId }, { rejectWithValue }) => {
    try {
    const username  = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Отсутствует токен авторизации');
      }

    const response = await axios.post('/api/v1/messages', { body, channelId, username }, {//username из auth, а не из параметра
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.token) throw new Error('No token');
      
      const response = await axios.get('/api/v1/messages', {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      
      console.log('Messages data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Fetch messages error:', error);
      return rejectWithValue(error.message);
    }
  }
);
