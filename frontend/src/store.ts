import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/users/user.slice';
import addressReducer from '@/features/addresses/address.slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    users: userReducer,
    addresses: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();