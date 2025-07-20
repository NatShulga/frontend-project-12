import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.get('/api/v1/channels', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (name, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post('/api/v1/channels', { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // Сервер должен возвращать созданный канал
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ channelId, name }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.patch(
        `/api/v1/channels/`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { id: channelId, name: response.data.name };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeChannel = createAsyncThunk('channels/removeChannel',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      //ЗАПРОС НА УДАЛЕНИЕЕЕЕ
      const response = await axios.delete(`/api/v1/channels/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2. Логируем ответ сервера перед возвратом
      console.log('API Response:', response.data);
      console.log('Deleted channel ID:', channelId);

      return { id: channelId };
    } catch (err) {
      // Логируем ошибку
      console.error('Delete channel error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
