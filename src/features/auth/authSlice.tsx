import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { loginAuthHandler,signupAuthHandler } from '../../services/authService';
import { LoginHandlerArg ,SignupHandlerArg} from '../../../Types';

export const loginHandler = createAsyncThunk(
  'auth/loginHandler',
  async (arg: LoginHandlerArg, { rejectWithValue }) => {
 

    try {
      const response = await loginAuthHandler(arg);
      if (response) {
        const { data, status } = response;
        if (status === 200) {
          localStorage.setItem('token', data?.accessToken);
          localStorage.setItem('username', data?.username);
          toast.success(`Welcome back, ${data?.username}`, {
            style: { background: '#22c55e', color: '#FFFFFF' },
          });
          return data;
        }
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupHandler = createAsyncThunk(
  'auth/signupHandler',
  async (arg:SignupHandlerArg, { rejectWithValue }) => {
   

    try {
      const {username,email,password}=arg;
      const response = await signupAuthHandler({ username, email, password });
      if (response) {
        const { data, status } = response;
        if (status === 200) {
          localStorage.setItem('token', data?.accessToken);
          localStorage.setItem('username', data?.username);
          toast.success(`Welcome to Easy Buy,${data?.username}`, {
            style: { background: '#22c55e', color: '#FFFFFF' },
          });
          return data;
        }
      }
    } catch (error: any) {
     
      return rejectWithValue(error.message);
    }
  }
);

type InitialState = {
  token: string | null;
  user: string | null;
  isLoading: boolean;
};

const initialState: InitialState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  user: localStorage.getItem('username'),
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LogoutHandler: state => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      toast.success('You are logged out...');
    },
  },
  extraReducers: builder => {
    builder.addCase(loginHandler.pending, state => {
      state.isLoading = true;
    }),
      builder.addCase(loginHandler.fulfilled, (state, action) => {
        state.isLoading = false;
       
        state.token = action.payload?.accessToken;
        state.user = action.payload?.username;
       
      }),
      builder.addCase(loginHandler.rejected, state => {
        state.isLoading = false;
      });
       builder.addCase(signupHandler.pending, state => {
         state.isLoading = true;
       }),
         builder.addCase(signupHandler.fulfilled, (state, action) => {
           state.isLoading = false;
          
           state.token = action.payload?.accessToken;
           state.user = action.payload?.username;
          
         }),
         builder.addCase(signupHandler.rejected, state => {
           state.isLoading = false;
         });
  },
});

export const authReducer = authSlice.reducer;

export const { LogoutHandler } = authSlice.actions;
