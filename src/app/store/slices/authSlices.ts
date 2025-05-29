import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface Admin {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  admin: null,
  token: localStorage.getItem('adminToken'),
  isAuthenticated: !!localStorage.getItem('adminToken'),
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/login', credentials);
      localStorage.setItem('adminToken', response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur de connexion');
    }
  }
);

export const logoutAdmin = createAsyncThunk('auth/logoutAdmin', async () => {
  localStorage.removeItem('adminToken');
  return null;
});

export const getCurrentAdmin = createAsyncThunk(
  'auth/getCurrentAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/me');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur de récupération des données');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
      })
      .addCase(getCurrentAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(getCurrentAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
