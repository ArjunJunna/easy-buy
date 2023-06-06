import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchUserDetails } from '../../services/userService';
import {UserData} from '../../../Types'
/*
type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
};
*/
type InitialState = {
  userData: UserData | null;
  isLoading: boolean;
};

const initialState: InitialState = {
  userData: {
    id: 1,
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    image: '',
    bloodGroup: '',
    height: 0,
    weight: 0,
    eyeColor: '',
    hair: {
      color: '',
      type: '',
    },
    domain: '',
    ip: '',
    address: {
      address: '',
      city: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
      postalCode: '',
      state: '',
    },
    macAddress: '',
    university: '',
    bank: {
      cardExpire: '',
      cardNumber: '',
      cardType: '',
      currency: '',
      iban: '',
    },
    company: {
      address: {
        address: '',
        city: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
        postalCode: '',
        state: '',
      },
      department: '',
      name: '',
      title: '',
    },
    ein: '',
    ssn: '',
    userAgent: '',
  },
  isLoading: false,
};

export const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetchUserDetails(id);
      const data:UserData = response?.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profileUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
     state.userData=action.payload;
    });
  },
});

export const profileReducer = profileSlice.reducer;


