import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import settingsReducer from './settingsReducer';
import clientReducer from './settingsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  client: clientReducer
});

export default rootReducer;
