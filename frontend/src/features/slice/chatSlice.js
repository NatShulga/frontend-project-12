import { createSlice } from '@reduxjs/toolkit';
import defaultChannel from '../../components/Chat/defaultChannel';

// Функции для работы с localStorage
const CHAT_STORAGE_KEY = 'chatState';

const loadChatState = () => {
  try {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Failed to load chat state', e);
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
  localStorage.removeItem(CHAT_STORAGE_KEY);
};

// Загружаем начальное состояние из localStorage
const savedState = loadChatState();

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
const combinedInitialState = {
  ...initialState,
  ...savedState,
  messages: {
    ...initialState.messages,
    data: savedState?.messages || initialState.messages.data
  }
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: combinedInitialState,
  reducers: {
    addChannel: (state, action) => {
      const newChannel = {
        id: Date.now(),
        name: action.payload,
        unread: 0,
        removable: true
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
    saveChatState(state);
    },
    
    clearMessages: (state) => {
      state.messages.data = [];
      
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
        channel.name = String(name);
      }
      saveChatState(state);
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
