import { createSlice } from '@reduxjs/toolkit';

//аутентификация пользователя
// Функция для безопасной загрузки текущего состояния авторизации
const loadInitialAuthState = () => {
  const token = localStorage.getItem('token');
  let user = null;

  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (err) {
    console.error('Ошибка при парсинге данных пользователя:', err);
    // При ошибке очищаем невалидные данные
    localStorage.removeItem('user');
  }

  return {
    token,
    user, // Или null, если данных нет
    isAuthenticated: !!token
  };
};

// хранение данных авторизации
export const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialAuthState(), // Загружаем начальное состояние
  reducers: {
    // Установка нового токена и данных пользователя
    setAuthToken: (state, action) => {
      const { token, user } = action.payload;

      // проверка 
      if (!user?.id || !user?.username) {
    console.error('должно содержать id и имя пользователя');
    return;
  }

      state.token = token;
      state.isAuthenticated = true;
      state.user = {
      id: user.id,          // идентификатор
      username: user.username, // Отображаемое имя
       ...user              // Остальные поля (email, avatar и т.д.)
      };
      

      // Сохраняем токен и профиль пользователя в localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },

    // Удаление токена и данных пользователя
    clearAuthToken: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Удаляем сохраненные данные из localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    // Обновление некоторых полей пользователя
    updateUserData: (state, action) => {
      if (!state.token || !action.payload) return;

      const { id, username, ...safeUpdates } = action.payload;
      state.user = {
        ...state.user,
        ...safeUpdates
      };

      try {
        localStorage.setItem('user', JSON.stringify(state.user));
      } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
      }
    }
  },
});


export const { setAuthToken, clearAuthToken, updateUserData } = authSlice.actions;
export default authSlice.reducer;
