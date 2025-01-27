import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axiosClient/axiosClient';

export const loginUser = createAsyncThunk('user/login', async (params: any) => {
  try {
    const { data, password } = params;
    const response = await axiosClient.post(`/api/v1/auth/login`, {
      data,
      password,
    });
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

const initialState: any = null;

const settingSlice = createSlice({
  name: 'settingReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export default settingSlice.reducer;
