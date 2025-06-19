import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUserInfo } from '../component/auth/authType';

// Define a type for the slice state


// Initial state
const initialState: IUserInfo = {
  id: 0,
  lastname: '',
  firstname: '',
  email: '',
  token:''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserInfo>) => {
      const { id, firstname, lastname, email } = action.payload;
      state.id = id;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
    },
    clearUserData: (state) => {
      state.id = 0;
      state.firstname = '';
      state.lastname = '';
      state.email = '';
    },
  },
});

// Export actions
export const { setUserData, clearUserData } = userSlice.actions;

// Export selector
// export const selectUser = (state: RootState) => state.user;


// Export reducer
export default userSlice.reducer;
