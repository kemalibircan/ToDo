import {createSlice} from '@reduxjs/toolkit';
const initialState = {
isListModalVisible:false,
isDetailModalVisible:false,
isNewListModalVisible:false
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleListModalVisible: (state, action) => {
      state.isListModalVisible = action.payload;
    },
    toggleDetailModalVisible: (state, action) => {
      state.isDetailModalVisible = action.payload;
    },
    toggleNewListModalVisible: (state, action) => {
      state.isNewListModalVisible = action.payload;
    },
  },
});

export const {toggleListModalVisible,toggleDetailModalVisible,toggleNewListModalVisible} = modalSlice.actions;

export const selectListModalVisible = state => state.modals.isListModalVisible;
export const selectDetailModalVisible = state => state.modals.isDetailModalVisible;
export const selectNewListModalVisible = state => state.modals.isNewListModalVisible;

export default modalSlice.reducer;
