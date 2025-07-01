import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
  'chat/sendMessage',
  async ({ body, channelId, username }, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.post('/api/v1/messages', 
      { body, channelId, username },
      { headers: { Authorization: `Bearer ${token}` }
  });
    return response.data;
  }
);


const initialState = {
  channels: {
    loading: false,
    error: null,
    data: [
      { id: 1, name: 'general', removable: false },
      { id: 2, name: 'random', removable: false }
    ],
  },
  currentChannelId: 1,
  messages: {
    loading: false,
    error: null,
    data: [],
  }
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
      const newMessage = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        user: action.payload.user
      };
      state.messages.data.push(newMessage);
      
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
      .addCase(fetchMessages.pending, (state) => {
        state.messages.loading = true;
        state.messages.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages.loading = false;
        state.messages.data = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
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
