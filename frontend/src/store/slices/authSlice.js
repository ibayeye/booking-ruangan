import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", { email, password });
      const { token, user } = res.data?.data;

      // Set token di header untuk request berikutnya
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login gagal");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/register", { name, email, password });
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registrasi gagal");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isRegistered: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      delete api.defaults.headers.common['Authorization'];
    },
    clearError: (state) => {
      state.error = null;
    },
    restoreAuthHeaders: (state) => {
      if (state.token && state.isAuthenticated) {
        api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      }
    },
    resetRegistration: (state) => {
      state.isRegistered = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isRegistered = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isRegistered = false;
      });
  },
});

export const { logout, clearError, restoreAuthHeaders, resetRegistration } = authSlice.actions;
export default authSlice.reducer;