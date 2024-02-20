import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  userId:null,
};

export const userProfileSlice = createSlice({
  name:'userProfile',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // Diğer bilgiler için benzer reducer işlevleri eklenebilir
  },
});

export const { setUsername,setUserId } = userProfileSlice.actions;

export const selectUsername = state =>state.userProfile.username;
export const selectUserId = state =>state.userProfile.userId;


export default userProfileSlice.reducer;
