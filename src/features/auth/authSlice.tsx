import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { loginAuthHandler } from '../../services/authService';

export const loginHandler = createAsyncThunk(
  'auth/loginHandler',
  async (arg: any, { rejectWithValue }) => {
    const { login, setLogin } = arg;
    console.log('from the fn.', login);
    try {
      const response = await loginAuthHandler(login.input);
      if (response) {
        const { data, status } = response;
        if (status === 200) {
          localStorage.setItem('token', data?.token);
          localStorage.setItem('username', JSON.stringify(data?.username));
          toast.success('Your are successfully logged in...', {
            style: { background: '#22c55e', color: '#FFFFFF' },
          });
          return data;
        }
      }
    } catch (error: any) {
      setLogin({ ...login, error: error.response.statusText });
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
  token: localStorage.getItem('token'),
  user: localStorage.getItem('username'),
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LogoutHandler: state => {
      state.token = null;
      state.user = '';
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
        state.token = action.payload.token;
        state.user = action.payload.username;
        console.log('look here', action.payload);
      }),
      builder.addCase(loginHandler.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { LogoutHandler } = authSlice.actions;
