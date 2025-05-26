import { createSlice } from '@reduxjs/toolkit';

const CHAT_STORAGE_KEY = 'chatMessages';

const loadMessagesFromStorage = () => {
  try {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Failed to parse saved messages', e);
    return null;
  }
};

const saveChatState = (state) => {
  try {
    const dataToSave = {
      messages: state.messages.data,
      channels: state.channels,
      currentChannelId: state.currentChannelId
    };
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.error('Failed to save chat state', e);
  }
};

const clearChatStorage = () => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear chat storage', e);
  }
};

const initialState = {
  channels: [
    { id: 1, name: 'general', unread: 0 },
    { id: 2, name: 'random', unread: 3 },
  ],
  currentChannelId: 1,
  messages: {
    loading: true,
    error: null,
    data: loadMessagesFromStorage()?.messages || []
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
        unread: 0,
      };
      state.channels.push(newChannel);
      saveChatState(state);
    },
    
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
      
      const channel = state.channels.find(c => c.id === action.payload);
      if (channel) {
        channel.unread = 0;
      }
      saveChatState(state);
    },
    
    addMessage: (state, action) => {
      const channelId = action.payload.channelId || state.currentChannelId;
      
      const newMessage = {
        id: Date.now(),
        channelId,
        text: action.payload.text,
        author: action.payload.author || 'Anonymous',
        timestamp: Date.now(),
      };
      
      state.messages.data.push(newMessage);

      if (action.payload.incrementUnread) {
        state.channels.forEach(channel => {
          if (channel.id !== channelId) {
            channel.unread = (channel.unread || 0) + 1;
          }
        });
      }
      saveChatState(state);
    },
    
    clearMessages: (state) => {
      state.messages.data = [];
      saveChatState(state);
    },
    
    resetChatState: (state) => {
      clearChatStorage();
      state.messages.data = [];
      state.currentChannelId = 1;
      state.channels = initialState.channels;
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
      saveChatState(state);
    },

    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find(ch => ch.id === id);
      
      if (channel) {
        channel.name = name;
      }
      saveChatState(state);
    },
  },
});

export const selectCurrentChannelId = (state) => state.chat.currentChannelId;
export const selectAllChannels = (state) => state?.chat?.channels || [];

export const selectCurrentChannel = (state) => {
  const currentChannelId = state?.chat?.currentChannelId;
  return selectAllChannels(state).find(c => c.id === currentChannelId) || null;
};

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