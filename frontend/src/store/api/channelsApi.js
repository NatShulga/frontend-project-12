import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChannels = createAsyncThunk(
  "channels/fetchChannels",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Проверяем наличие токена
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Токен отсутствует в Redux store");
        dispatch(logout()); // Очищаем состояние
        return rejectWithValue("Токен отсутствует");
      }

      // Отправляем запрос с таймаутом
      const response = await axios.get("/api/v1/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 5000, // Таймаут 5 секунд
      });

      //Проверяем структуру ответа
      if (!Array.isArray(response.data)) {
        console.error("Некорректный формат каналов:", response.data);
        throw new Error("Сервер вернул некорректные данные");
      }

      return response.data;
    } catch (error) {
      //логирование ошибок
      console.error("Ошибка при загрузке каналов:", {
        status: error.response?.status,
        message: error.message,
        config: error.config,
      });

      if (error.response?.status === 401) {
        //выходим, если 401, а не топчемся в локалсторидже
        dispatch(logout());
        localStorage.removeItem("token");
      }

      //тож ошибочки
      return rejectWithValue({
        status: error.response?.status || 500,
        message:
          error.response?.data?.message ||
          error.message ||
          "Неизвестная ошибка при загрузке каналов",
      });
    }
  }
);

export const addChannel = createAsyncThunk(
  "channels/addChannel",
  async (name, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    console.log("addChannel: token exists?", !!token);
    if (!token) {
      return rejectWithValue("No token");
    }

    try {
      const response = await axios.post("/api/v1/channels", { name }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("addChannel success:", response.data);
      return response.data;
    } catch (err) {
      console.error("addChannel error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const editChannel = createAsyncThunk(
  "channels/editChannel",
  async ({ channelId, name }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.patch(
        `/api/v1/channels/${channelId}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { id: channelId, name: response.data.name };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeChannel = createAsyncThunk(
  "channels/removeChannel",
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      //ЗАПРОС НА УДАЛЕНИЕЕЕЕ
      const response = await axios.delete(`/api/v1/channels/${channelId}`, {
        //удаление. Запрос по channelId
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 2. Логируем ответ сервера перед возвратом
      console.log("API Response:", response.data);
      console.log("Deleted channel ID:", channelId);

      return { id: channelId };
    } catch (err) {
      // Логируем ошибку
      console.error("Delete channel error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
