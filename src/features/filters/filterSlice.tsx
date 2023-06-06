import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category,SortPriceType } from '../../../Types';

type CategoryState = {
  category: Category;
  sortPrice: SortPriceType;
  rating: number;
  pricing: string;
};

const initialState: CategoryState = {
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
     
    },
    SortPrice: (state, action: PayloadAction<SortPriceType>) => {
      state.sortPrice = action.payload;
      
    },
    SortByRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
      
    },
    SortByPricing: (state, action: PayloadAction<string>) => {
      state.pricing = action.payload;
      
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
