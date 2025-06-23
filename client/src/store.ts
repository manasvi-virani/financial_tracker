import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './reducer/accountSlice';
import userReducer from './reducer/userSlice'

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

  