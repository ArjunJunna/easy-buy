import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getSingleProduct,
  addToWishlist,
  removeProductFromWishlist,
} from '../../services/productService';
import toast from 'react-hot-toast';
import { ProductData, WishlistArgType } from '../../../Types';

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await getSingleProduct(_id);
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

export const addProductToWishlist = createAsyncThunk(
  'cart/addProductToWishlist',
  async (arg: WishlistArgType, { rejectWithValue }) => {
    try {
      const response = await addToWishlist(arg);
      const data = response?.data;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductFromWishlist = createAsyncThunk(
  'cart/removeProductFromWishlist',
  async (arg: WishlistArgType, { rejectWithValue }) => {
    try {
      const response = await removeProductFromWishlist(arg);
      const data = response?.data;
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
    builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
      state.wishlistData = action.payload;
      toast.success('Product added to Wishlist', {
        style: { background: '#22c55e', color: '#FFFFFF' },
      });
    });
    builder.addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
      if (action.payload) {
        toast.success('Product removed from wishlist.', {
          style: { background: '#c57622', color: '#FFFFFF' },
        });
      }
      state.wishlistData = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;

export const { ClearWishlist, SearchProduct } = productSlice.actions;
