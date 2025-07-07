import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels } from '../../store/api/channelsApi';
import { sendMessage } from '../../store/api/messagesApi';

const initialState = {
  channels: {
    data: [],
    loading: false,
    error: null,
  },
  currentChannelId: 1,
  messages: [],
  loading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const newChannel = {
        id: Date.now(),
        name: action.payload,
        removable: true,
        creator: action.payload.creator
      };
      state.channels.data.push(newChannel);
    },
    
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    
    },
    
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    
    },
    
    clearMessages: (state) => {
      state.messages.data = [];
    },
    
    resetChatState: (state) => {
      return {
        ...initialState,
        messages: {
          ...initialState.messages,
          data: state.messages.data
        }
      };
    },

    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channels.data = state.channels.data.filter(channel => channel.id !== channelId);
      state.messages.data = state.messages.data.filter(
        message => message.channelId !== channelId
      );
      
      if (state.currentChannelId === channelId) {
        state.currentChannelId = 1;
      }
    },

    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.data.find(ch => ch.id === id);
      if (channel) {
        channel.name = name.trim();
      }
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.channels.loading = true;
        state.channels.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.channels.loading = false;
        state.channels.data = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.channels.loading = false;
        state.channels.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.messages.loading = true;
        state.messages.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.loading = false;
        state.messages.data = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.messages.loading = false;
        state.messages.error = action.error.message;
      });
  },
});


export const selectCurrentChannelId = (state) => state.chat.currentChannelId;
export const selectAllChannels = (state) => state.chat.channels.data || [];
export const selectChannelsLoading = (state) => state.chat.channels.loading;
export const selectChannelsError = (state) => state.chat.channels.error;

export const selectAllMessages = (state) => state.chat.messages.data || [];
export const selectMessagesLoading = (state) => state.chat.messages.loading;
export const selectMessagesError = (state) => state.chat.messages.error;

export const selectCurrentMessages = (state) => {
  const messages = selectAllMessages(state);
  const currentChannelId = selectCurrentChannelId(state);
  return currentChannelId 
    ? messages.filter(m => m.channelId === currentChannelId)
    : [];
};

export const selectCurrentChannel = (state) => {
  const currentChannelId = state.chat.currentChannelId;
  return selectAllChannels(state).find(c => c.id === currentChannelId) || null;
};


export const { 
  addChannel, 
  setCurrentChannel, 
  addMessage,
  clearMessages,
  resetChatState,
  removeChannel,
  renameChannel
} = chatSlice.actions;

export default chatSlice.reducer;
