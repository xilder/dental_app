import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient/axiosClient';
import UserData from '../../interfaces/userData';

interface LoginDetails {
  data?: string;
  password: string | undefined;
}

// let serverError: string = 'eee';

export const registerUser = createAsyncThunk(
  'user/register',
  async (params: UserData, thunkApi) => {
    // const { first_name, last_name, email, username, password } = params;
    try {
      const response = await axiosClient.post('/api/v1/auth/register', params);
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
    // console.log(response.data, response.status)
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (params: LoginDetails, thunkApi) => {
    try {
      const response = await axiosClient.post(`/api/v1/auth/login`, params);
      // const cookies = await response.headers['set-cookie']
      // console.log(cookies)
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (_, thunkApi) => {
    try {
      await axiosClient.delete('/api/v1/auth/users');
      return;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

// export const updateUser = createAsyncthunk('user/update', async (params) => {
//   const response = await axiosClient.post('/api/v1/auth/users', params)
//   if res
// })

const defaultState: UserData = {
  id: '',
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  loading: false,
  serverResponse: {
    error: false,
    message: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    reset: () => defaultState,
    removeInfo: (state) => ({
      ...state,
      loading: false,
      serverResponse: { error: false, message: '' },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        loading: false,
        serverResponse: {
          error: false,
          message: '',
        },
      }))
      .addCase(loginUser.pending, () => ({
        ...defaultState,
        loading: true,
        serverResponse: {
          error: false,
          message: '',
        },
      }))
      .addCase(loginUser.rejected, (_, action) => ({
        ...defaultState,
        loading: false,
        serverResponse: {
          error: true,
          message: action.payload as string,
        },
      }))
      .addCase(registerUser.fulfilled, () => defaultState)
      .addCase(registerUser.pending, () => ({
        ...defaultState,
        loading: true,
      }))
      .addCase(registerUser.rejected, (_, action) => ({
        ...defaultState,
        loading: false,
        serverResponse: {
          error: false,
          message: '',
        },
      }))
      .addCase(deleteUser.fulfilled, () => defaultState)
      .addCase(deleteUser.pending, (state) => ({
        ...state,
        loading: true,
        serverResponse: {
          error: false,
          message: '',
        },
      }))
      .addCase(deleteUser.rejected, (state) => ({
        ...state,
        loading: false,
        serverResponse: {
          error: false,
          message: '',
        },
      }));
  },
});

export const { reset, removeInfo } = userSlice.actions;
export default userSlice.reducer;
