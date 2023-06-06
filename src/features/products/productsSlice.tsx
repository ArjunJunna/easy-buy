import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getSingleProduct,
} from '../../services/productService';
import toast from 'react-hot-toast';
import { ProductData } from '../../../Types';

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getSingleProduct(id);
      const data: ProductData = response?.data;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProducts();
      const data: ProductData[] = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type InitialState = {
  loading: boolean;
  error: string;
  productsData: ProductData[];
  wishlistData: ProductData[] | [];
  singleProductData: ProductData | null;
  searchValue: string;
};

const initialState: InitialState = {
  loading: false,
  error: '',
  productsData: [],
  singleProductData: null,
  wishlistData: [],
  searchValue: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    AddToWishlist: (state, action: PayloadAction<ProductData>) => {
      if (action.payload) {
        toast.success('Your product has been added to wishlist.', {
          style: { background: '#22c55e', color: '#FFFFFF' },
        });
      }
      state.wishlistData = [...state.wishlistData, action.payload];
    },
    RemoveFromWishlist: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        toast.success('Your product is removed from cartlist.', {
          style: { background: '#c57622', color: '#FFFFFF' },
        });
      }
      state.wishlistData = state.wishlistData.filter(
        item => item.id !== action.payload
      );
    },
    ClearWishlist: state => {
      state.wishlistData = [];
    },
    SearchProduct: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchAllProducts.fulfilled,
      (state, action: PayloadAction<ProductData[]>) => {
        state.loading = false;
        state.productsData = action.payload;
      }
    );
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchSingleProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchSingleProduct.fulfilled,
      (state, action: PayloadAction<ProductData>) => {
        state.loading = false;
        state.singleProductData = action.payload;
      }
    );
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const productReducer = productSlice.reducer;

export const {
  AddToWishlist,
  RemoveFromWishlist,
  ClearWishlist,
  SearchProduct,
} = productSlice.actions;
