import { createSlice } from '@reduxjs/toolkit';

// Функция для загрузки сохраненного состояния
const loadSavedState = () => {
  try {
    const savedState = localStorage.getItem('chatState');
    return savedState ? JSON.parse(savedState) : null;
  } catch (e) {
    console.error('Failed to parse saved state', e);
    return null;
  }
};

// Функция для сохранения состояния в localStorage
const saveState = (state) => {
  try {
    const stateToSave = {
      messages: state.messages,
      channels: state.channels,
      currentChannelId: state.currentChannelId
    };
    localStorage.setItem('chatState', JSON.stringify(stateToSave));
  } catch (e) {
    console.error('Failed to save state', e);
  }
};

const initialState = {
  channels: [
    { id: 1, name: 'general', unread: 0, removable: false },
    { id: 2, name: 'random', unread: 3, removable: false },
  ],
  currentChannelId: 1,
  messages: {
    loading: false,
    error: null,
    data: loadSavedState()?.messages.data || [], // Загружаем сохраненные сообщения
  }
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const newChannel = {
        id: Date.now(),
        name: action.payload.name,
        unread: 0,
        removable: true,
        creator: action.payload.creator // Сохраняем создателя канала
      };
      state.channels.push(newChannel);
      saveState(state); // Сохраняем состояние
    },
    
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
      const channel = state.channels.find(c => c.id === action.payload);
      if (channel) {
        channel.unread = 0;
      }
      saveState(state); // Сохраняем состояние
    },
    
    addMessage: (state, action) => {
      const newMessage = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        user: action.payload.user // Сохраняем информацию о пользователе
      };
      state.messages.data.push(newMessage);
      
      // Обновляем счетчик непрочитанных для канала (кроме текущего)
      if (action.payload.channelId !== state.currentChannelId) {
        const channel = state.channels.find(c => c.id === action.payload.channelId);
        if (channel) channel.unread += 1;
      }
      
      saveState(state); // Сохраняем состояние
    },
    
    clearMessages: (state) => {
      state.messages.data = [];
      saveState(state); // Сохраняем состояние
    },
    
    resetChatState: (state) => {
      // Сохраняем только сообщения при сбросе
      const savedMessages = state.messages.data;
      return {
        ...initialState,
        messages: {
          ...initialState.messages,
          data: savedMessages
        }
      };
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
      
      saveState(state); // Сохраняем состояние
    },

    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find(ch => ch.id === id);
      if (channel) {
        channel.name = name.trim();
      }
      saveState(state); // Сохраняем состояние
    },
  },
});

// Селекторы с учетом пользователей
export const selectMessageAuthor = (messageId) => (state) => {
  const message = state.chat.messages.data.find(m => m.id === messageId);
  return message?.user || null;
};

export const selectChannelCreator = (channelId) => (state) => {
  const channel = state.chat.channels.find(c => c.id === channelId);
  return channel?.creator || null;
};

// Остальные селекторы остаются без изменений
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

export const selectAllMessages = (state) => state.chat.messages.data || [];

export const selectCurrentMessages = (state) => {
  const messages = selectAllMessages(state);
  const currentChannelId = selectCurrentChannelId(state);
  return currentChannelId 
    ? messages.filter(m => m.channelId === currentChannelId)
    : [];
};

export const selectMessagesLoading = (state) => state.chat.messages.loading;
export const selectMessagesError = (state) => state.chat.messages.error;

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
