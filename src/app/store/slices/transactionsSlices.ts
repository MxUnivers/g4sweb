import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface Transaction {
  _id: string;
  order: {
    _id: string;
    items: Array<{
      product: {
        _id: string;
        name: string;
        price: number;
      };
      quantity: number;
    }>;
  };
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  amount: number;
  paymentMethod: string;
  status: 'success' | 'failed' | 'pending';
  createdAt: string;
  updatedAt: string;
}

interface TransactionsState {
  items: Transaction[];
  selectedTransaction: Transaction | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  selectedTransaction: null,
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (filters: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/transaction/ge_transactions', { params: filters });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur de récupération des transactions');
    }
  }
);

export const fetchTransactionById = createAsyncThunk(
  'transactions/fetchTransactionById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/transaction/ge_transaction/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur de récupération de la transaction');
    }
  }
);

export const updateTransactionStatus = createAsyncThunk(
  'transactions/updateTransactionStatus',
  async ({ id, status }: { id: string; status: 'success' | 'failed' | 'pending' }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/transaction/update/${id}`, { status });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur lors de la mise à jour du statut');
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
    },
    clearTransactionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTransactionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        );
        if (state.selectedTransaction && state.selectedTransaction._id === action.payload._id) {
          state.selectedTransaction = action.payload;
        }
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedTransaction, clearTransactionError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
