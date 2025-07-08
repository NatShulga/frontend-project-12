import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels, addChannel, removeChannel, editChannel } from '../../store/api/channelsApi';


const initialState = {
  channels: {
    data: [],
    loading: false,
    error: null,
  }}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        if (!state.currentChannelId && action.payload.length > 0) {
          state.currentChannelId = action.payload[0].id;
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        const channel = state.data.find(c => c.id === action.payload.id);
        if (channel) {
          channel.name = action.payload.name;
        }
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.data = state.data.filter(c => c.id !== action.payload);
        if (state.currentChannelId === action.payload) {
          state.currentChannelId = state.data[0]?.id || null;
        }
      });
  },
});

export const selectAllChannels = (state) => state.channels.data || [];
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectChannelsLoading = (state) => state.channels.loading;
export const selectChannelsError = (state) => state.channels.error;

  export const selectCurrentChannel = (state) => {
  const currentChannelId = selectCurrentChannelId(state);
  return selectAllChannels(state).find(c => c.id === currentChannelId) || null;
  }

export const { setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;

