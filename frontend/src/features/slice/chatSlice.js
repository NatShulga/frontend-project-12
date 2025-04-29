import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [
    { id: 1, name: 'general', unread: 0 },
    { id: 2, name: 'random', unread: 3 },
  ],
  currentChannelId: 1, // Храним только ID текущего канала
  messages: [ // Добавляем messages в состояние
    { id: 1, channelId: 1, text: 'Welcome!', sender: 'System', timestamp: Date.now() },
    { id: 2, channelId: 1, text: 'Hello everyone!', sender: 'User1', timestamp: Date.now() },
  ],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState, // Используем подготовленные данные
  reducers: {
    addChannel: (state, action) => {
      const newChannel = {
        id: Date.now(),
        name: action.payload,
        unread: 0,
      };
      state.channels.push(newChannel);
    },
    
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
      
      // Сбрасываем счётчик непрочитанных
      const channel = state.channels.find(c => c.id === action.payload);
      if (channel) channel.unread = 0;
    },
    
    addMessage: (state, action) => {
      const newMessage = {
        id: Date.now(),
        channelId: action.payload.channelId || state.currentChannelId,
        text: action.payload.text,
        sender: action.payload.sender || 'Anonymous',
        timestamp: Date.now(),
      };
      state.messages.push(newMessage);

      // Увеличиваем счётчик непрочитанных для других каналов
      if (action.payload.incrementUnread) {
        state.channels.forEach(channel => {
          if (channel.id !== (action.payload.channelId || state.currentChannelId)) {
            channel.unread = (channel.unread || 0) + 1;
          }
        });
      }
    },
  },
});

export const { addChannel, setCurrentChannel, addMessage } = chatSlice.actions;

// Селекторы
export const selectAllChannels = state => state.chat.channels;
export const selectCurrentChannel = state => 
  state.chat.channels.find(c => c.id === state.chat.currentChannelId);
export const selectCurrentMessages = state => 
  state.chat.messages.filter(m => m.channelId === state.chat.currentChannelId);



export default chatSlice.reducer;
