import { createSlice } from '@reduxjs/toolkit';

const loadMessagesFromStorage = () => {
  try {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Failed to parse saved messages', e);
    return null;
  }
};

const saveChatState = (state) => {
  try {
    localStorage.setItem('chatMessages', JSON.stringify(state.messages.data));
  } catch (e) {
    console.error('Failed to save messages', e);
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
    data: loadMessagesFromStorage() || []
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
      console.log('Setting current channel to:', action.payload);
      state.currentChannelId = action.payload;
      
      const channel = state.channels.find(c => c.id === action.payload);
      if (channel) {
        console.log('Resetting unread for channel:', channel.id);
        channel.unread = 0;
      }
      saveChatState(state);
    },
    
    
    addMessage: (state, action) => {
      const channelId = action.payload.channelId || state.currentChannelId;
      console.log('Adding message to channel:', channelId);
      
      const newMessage = {
        id: Date.now(),
        channelId,
        text: action.payload.text,
        sender: action.payload.sender || 'Anonymous',
        timestamp: Date.now(),
      };
      
      state.messages.data.push(newMessage);

      if (action.payload.incrementUnread) {
        state.channels.forEach(channel => {
          if (channel.id !== channelId) {
            console.log('Incrementing unread for channel:', channel.id);
            channel.unread = (channel.unread || 0) + 1;
          }
        });
      }
      saveChatState(state);
    },
    
    // редюсер для очистки сообщений
    clearMessages: (state) => {
      state.messages.data = [];
      saveChatState(state);
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
  removeChannel,
  renameChannel
} = chatSlice.actions;

export default chatSlice.reducer;