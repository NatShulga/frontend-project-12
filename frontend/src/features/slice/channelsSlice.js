import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels, addChannel, removeChannel, editChannel } from '../../store/api/channelsApi';


const initialState = {
    data: [],
    currentChannelId: null,
    loading: false,
    error: null,
  }

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
        const channel = state.data.find(channel => channel.id === action.payload.id);
        if (channel) {
          channel.name = action.payload.name;
        }
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const { id } = action.payload; //id канала который удаляем
        state.data = state.data.filter(channel => channel.id !== id);//убираем его из списка
        //после удаления канала, переключается на текущий. 
        if (state.currentChannelId === id) {
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

