import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const addChannel = async (name, token) => {
  try {
    const newChannel = { name };
    const response = await axios.post('/api/v1/channels', newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Ошибка при создании канала', err);
    throw err;
  }
};

export const removeChannel = async (channelId, token) => {
  try {
    const response = await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Ошибка при удалении канала', err);
    throw err;
  }
};

export const editChannel = async (channelId, name, token) => {
  try {
    const response = await axios.patch(
      `/api/v1/channels/${channelId}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error('Ошибка при редактировании поста:', err);
    throw err;
  }
};
