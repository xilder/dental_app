import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient/axiosClient';
import UserInterface from '../../interfaces/userInterface';

interface LoginDetails {
  data: string;
  password: string | undefined;
}

export const registerUser = createAsyncThunk(
  'user/register',
  async (params: UserInterface) => {
    // const { first_name, last_name, email, username, password } = params;
    const response = await axiosClient.post('/api/v1/auth/register', params);
    if (response.status !== 201) {
      throw new Error(response.data);
    }
    // console.log(response.data, response.status)
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (params: LoginDetails) => {
    // const { data, password } = params;
    const response = await axiosClient.post(`/api/v1/auth/login`, params);
    // const cookies = await response.headers['set-cookie']
    // console.log(cookies)
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete', async () => {
    const response = await axiosClient.delete('/api/v1/auth/users')
    if (response.status !== 200) {
      throw new Error(response.data)
    }
    return
  }
)

// export const updateUser = createAsyncthunk('user/update', async (params) => {
//   const response = await axiosClient.post('/api/v1/auth/users', params)
//   if res
// })

const defaultState = {
  id: null,
  first_name: null,
  last_name: null,
  username: null,
  email: null,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState: defaultState,
  reducers: {
    reset: () => defaultState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(loginUser.rejected, () => defaultState)
      .addCase(registerUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(registerUser.rejected, () => defaultState)
      .addCase(deleteUser.fulfilled, () => defaultState)
      .addCase(deleteUser.rejected, (state) => state);
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
