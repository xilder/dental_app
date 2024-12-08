import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
    reducer: rootReducer
})

export const defaultState = store.getState()
export type DefaultState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
