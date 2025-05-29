import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface Category {
  _id: string;
  name: string;
  description: string;
  access: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesState {
  items: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/category/get_categorys');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Erreur de récupération des catégories');
  }
});

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/category/get_category/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur de récupération de la catégorie');
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData: { name: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/category/create', categoryData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur lors de la création de la catégorie');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (
    { id, categoryData }: { id: string; categoryData: { name: string; description: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/category/edit/${id}`, categoryData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur lors de la mise à jour de la catégorie');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/category/delete/${id}`);
      return { id, response: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erreur lors de la suppression de la catégorie');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
        state.selectedCategory = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        const category = state.items.find((cat) => cat._id === id);
        if (category) {
          category.access = !category.access;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedCategory, clearCategoryError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
