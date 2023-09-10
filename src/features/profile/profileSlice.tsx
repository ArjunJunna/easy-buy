import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDetails, addNewAddress,getAllUserAddresses,deleteUserAddress, editUserAddress } from '../../services/userService';
import { UserData, UserAddressRequestData, UserAddressResponseData } from '../../../Types';
import toast from 'react-hot-toast';

type InitialState = {
  userData: UserData | null;
  isLoading: boolean;
  userAddress: UserAddressResponseData[];
  selectedAddress: UserAddressResponseData | null;
};

const initialState: InitialState = {
  userData: {
    _id: '',
    username: '',
    email: '',
  },
  isLoading: false,
  userAddress: [],
  selectedAddress: null,
};

export const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await fetchUserDetails(name);
      const data: UserData = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserAddresses = createAsyncThunk(
  'profile/getAllUserAddresses',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getAllUserAddresses(userId);

      const data: UserAddressResponseData[] = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUserAddress = createAsyncThunk(
  'profile/addAddress',
  async (arg: UserAddressRequestData, { rejectWithValue }) => {
    try {
      const response = await addNewAddress(arg);
      const data=response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



export const deleteUserAddressById = createAsyncThunk(
  'profile/deleteAddress',
  async (arg: string, { rejectWithValue }) => {
    try {
      const response = await deleteUserAddress(arg);
      const data: UserAddressResponseData = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUserAddressById = createAsyncThunk(
  'profile/editAddress',
  async (arg: any, { rejectWithValue }) => {
    try {
      const response = await editUserAddress(arg);
      const data: UserAddressResponseData = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profileUser',
  initialState,
  reducers: {
    ClearProfileData: state => {
      return {
        ...state,
        userData: {
          _id: '',
          username: '',
          email: '',
        },
        userAddress: [],
        selectedAddress: null,
      };
    },
    AddSelectedAddress:(state,action)=>{
      state.selectedAddress=action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const { _id, username, email } = action.payload;
      if (state.userData) {
        state.userData._id = _id;
        state.userData.username = username;
        state.userData.email = email;
      }
    });
    builder.addCase(addUserAddress.fulfilled, (state, action) => {
    
      if (action.payload ) {
        const newAddress: UserAddressResponseData = action.payload;
        state.userAddress = [...state.userAddress, newAddress];
        toast.success('New Address added.', {
          style: { background: '#22c55e', color: '#FFFFFF' },
        });
      }
    });
    builder.addCase(getUserAddresses.fulfilled, (state, action) => {
 
      state.userAddress = action.payload;
    });
    builder.addCase(deleteUserAddressById.fulfilled, (state, action) => {
    
          if (action.payload) {
            toast.success('Address was deleted.', {
              style: { background: '#c57622', color: '#FFFFFF' },
            });
          }
      
      const userAddressData=state.userAddress.filter((address)=>address._id!==action.payload._id)
      state.userAddress=userAddressData;
      
    });
    builder.addCase(editUserAddressById.fulfilled, (state, action) => {
      const editedAddress: UserAddressResponseData = action.payload;
      const editedAddressIndex = state.userAddress.findIndex(
        address => address._id === editedAddress._id
      );

      if (editedAddressIndex !== -1) {
        toast.success('Address was edited.', {
          style: { background: '#5863e0', color: '#FFFFFF' },
        });
        state.userAddress[editedAddressIndex] = editedAddress;
        if (state.selectedAddress?._id === editedAddress._id) {
          state.selectedAddress = editedAddress;
        }
      }
    });
  },
});

export const profileReducer = profileSlice.reducer;

export const { ClearProfileData,AddSelectedAddress } = profileSlice.actions;
