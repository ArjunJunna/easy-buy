import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Category =
  | 'Show All Products'
  | 'electronics'
  | 'jewelery'
  | `men's clothing`
  | `women's clothing`;

export type SortPrice = 'LOW_TO_HIGH' | 'HIGH_TO_LOW' | '';

type categoryState = {
  category: Category;
  sortPrice: SortPrice;
  rating: number;
  pricing: string;
};

const initialState: categoryState = {
  category: 'Show All Products',
  sortPrice: '',
  rating: 5,
  pricing: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    SetCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
      console.log(action.payload, 'was clicked');
    },
    SortPrice: (state, action: PayloadAction<SortPrice>) => {
      state.sortPrice = action.payload;
      console.log(action.payload, 'was clicked');
    },
    SortByRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
      console.log(action.payload, 'was clicked');
    },
    SortByPricing: (state, action: PayloadAction<string>) => {
      state.pricing = action.payload;
      console.log(action.payload, 'was clicked');
    },
    ClearFilters:(state)=>{
      state.category = initialState.category;
      state.sortPrice = initialState.sortPrice;
      state.rating = initialState.rating;
      state.pricing = initialState.pricing;
    }
  },
});

export const filterReducer = filterSlice.reducer;

export const { SetCategory, SortPrice, SortByRating,SortByPricing,ClearFilters } = filterSlice.actions;
