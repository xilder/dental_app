import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient/axiosClient';
import UserData from '../../interfaces/userData';

interface LoginDetails {
  data?: string;
  password?: string;
}

// let serverError: string = 'eee';

export const registerUser = createAsyncThunk(
  'user/register',
  async (params: UserData, thunkApi) => {
    // const { first_name, last_name, email, username, password } = params;
    try {
      const response = await axiosClient.post(
        '/api/v1/auth/register/patient',
        params
      );
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const loginProfile = createAsyncThunk(
  'profile/login',
  async (_, thunkApi) => {
    try {
      const response = await axiosClient.get('api/v1/auth/profile');
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (params: LoginDetails, thunkApi) => {
    try {
      const response = await axiosClient.post(`/api/v1/auth/login`, params);
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkApi) => {
    try {
      const response = await axiosClient.delete(`/api/v1/auth/logout`);
      return response.data;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
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
  serverError: false,
  serverMessage: '',
  name: '',
  type: '',
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
    getProfileAction: (_, action) => ({
      ...defaultState,
      ...action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        loading: false,
        serverError: false,
        serverMessage: '',
      }))
      .addCase(loginUser.pending, () => ({
        ...defaultState,
        loading: true,
        serverError: false,
        serverMessage: '',
      }))
      .addCase(loginUser.rejected, (_, action) => ({
        ...defaultState,
        loading: false,
        serverError: true,
        serverMessage: action.payload as string,
      }))
      .addCase(loginProfile.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        loading: false,
        serverError: false,
        serverMessage: '',
      }))
      .addCase(loginProfile.pending, (state) => ({
        ...state,
        loading: true,
        serverError: false,
        serverMessage: '',
      }))
      .addCase(loginProfile.rejected, (state, action) => ({
        ...state,
        loading: false,
        serverError: false,
        serverMessage: action.payload as string,
      }))
      .addCase(logoutUser.fulfilled, () => ({
        ...defaultState,
      }))
      .addCase(logoutUser.pending, (state, _) => ({
        ...state,
        loading: true,
        serverError: false,
        serverMessage: '',
      }))
      .addCase(logoutUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        serverError: true,
        serverMessage: action.payload as string,
      }))
      .addCase(registerUser.fulfilled, (_, action) => ({
        ...defaultState,
        serverError: false,
        serverMessage: action.payload as string,
      }))
      .addCase(registerUser.pending, () => ({
        ...defaultState,
        loading: true,
        serverError: false,
        serverMessage: '',
      }))
      .addCase(registerUser.rejected, (_, action) => ({
        ...defaultState,
        loading: false,
        serverError: true,
        serverMessage: action.payload as string,
      }))
      .addCase(deleteUser.fulfilled, () => defaultState)
      .addCase(deleteUser.pending, (state) => ({
        ...state,
        loading: true,
        serverError: false,
        serverMessage: '',
      }))
      .addCase(deleteUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        serverError: false,
        serverMessage: action.payload as string,
      }));
  },
});

export const { reset, removeInfo, getProfileAction } = userSlice.actions;
export default userSlice.reducer;
