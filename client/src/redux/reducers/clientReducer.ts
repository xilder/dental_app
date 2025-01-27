import { createSlice } from '@reduxjs/toolkit';
import io, { Socket } from 'socket.io-client';

const initialState: Socket = io();

const clientSlice = createSlice({
  name: 'clientReducer',
  initialState,
  reducers: {
    setClient: (_, action) => ({
        ...action.payload
    })
  }
});

export const { setClient } = clientSlice.actions;
export default clientSlice.reducer;
