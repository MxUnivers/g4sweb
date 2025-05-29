import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: {
    _id: string;
    name: string;
    description: string;
  };
  images: string[];
  access: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/product/get_products', { params: filters });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur de récupération des produits');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/product/get_product/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur de récupération du produit');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: Partial<Product>, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/create', productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur lors de la création du produit');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }: { id: string; productData: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/product/edit/${id}`, productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur lors de la mise à jour du produit');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/product/delete/${id}`);
      return { id, response: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur lors de la suppression du produit');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.selectedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        const product = state.items.find((prod) => prod._id === id);
        if (product) {
          product.access = !product.access;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedProduct, clearProductError } = productsSlice.actions;
export default productsSlice.reducer;
