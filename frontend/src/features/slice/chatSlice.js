import { createSlice } from '@reduxjs/toolkit';
import defaultChannel from '../../components/Chat/defaultChannel';

const initialState = {
  channels: [
    { id: 1, name: 'general', unread: 0 },
    { id: 2, name: 'random', unread: 3 },
  ],
  currentChannelId: 1,
  messages: {
    loading: true,
    error: null,
    data: []
  }
};

// Состояние загруженния и состояние с initialState
//const combinedInitialState = {
  //...initialState,
  //messages: {
    //...initialState.messages,
    //data: savedState?.messages || initialState.messages.data
  //}
//};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const newChannel = {
        id: Date.now(),
        name: action.payload,
        unread: 0,
        removable: true
      };
      state.channels.push(newChannel);
    }, 
    resetMessages: (state) => {
      state.messages = [];
    },
    
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
      
      const channel = state.channels.find(c => c.id === action.payload);
      if (channel) {
        channel.unread = 0;
      }
    },
    
    addMessage: (state, action) => {
      
      const newMessage = {
        id: Date.now(),
        channelId: action.payload.channelId,
        text: action.payload.text,
        username: action.payload.username,
        timestamp: Date.now(),
      };
      state.messages.data.push(newMessage);

      if (action.payload.incrementUnread) {
        state.channels.forEach(channel => {
          if (channel.id !== action.payload.channelId) {
            channel.unread = (channel.unread || 0) + 1;
          }
        });
      }
    },
    
    clearMessages: (state) => {
      state.messages.data = [];
      
    },
    
    resetChatState: (state) => {
      return initialState;
      //clearChatStorage();
      //state.messages.data = [];
      //state.currentChannelId = 1;
      //state.channels = initialState.channels;
    },

    removeChannel: (state, action) => {
      const channelId = action.payload;
      
      state.channels = state.channels.filter(channel => channel.id !== channelId);
      state.messages.data = state.messages.data.filter(
        message => message.channelId !== channelId
      );
      
      if (state.currentChannelId === channelId) {
        state.currentChannelId = 1;
      }
    },

    renameChannel: (state, action) => {
      
      const { id, name } = action.payload;
      const channel = state.channels.find(ch => ch.id === id);
      
      if (channel) {
        channel.name = name.trim();
      }
      //saveChatState(state);
    },
  },
});

export const selectIsChannelRemovable = (channelId) => (state) => {
  const channel = state.chat.channels.find(c => c.id === channelId);
  return channel ? channel.removable : false;
};

export const selectCurrentChannelId = (state) => state.chat.currentChannelId;
export const selectAllChannels = (state) => state?.chat?.channels || [];

export const selectCurrentChannel = (state) => {
  const currentChannelId = state?.chat?.currentChannelId;
  return selectAllChannels(state).find(c => c.id === currentChannelId) || null;
};

export const selectAllMessages = (state) => state.chat.messages;

export const selectCurrentMessages = (state) => {
  const messages = state?.chat?.messages?.data || [];
  const currentChannelId = selectCurrentChannelId(state);
  return currentChannelId 
    ? messages.filter(m => m.channelId === currentChannelId)
    : [];
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
