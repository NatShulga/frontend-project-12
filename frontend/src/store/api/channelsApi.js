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

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return channelId;
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
        `/api/v1/channels/${channelId}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { id: channelId, name: response.data.name };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
