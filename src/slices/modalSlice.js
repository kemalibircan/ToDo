import {createSlice} from '@reduxjs/toolkit';
const initialState = {
isListModalVisible:false,
isDetailModalVisible:false,
isNewListModalVisible:false,
isNewTaskModalVisible:false,
isEditModalVisible:false
};
// Reducer fonksiyonlarının her biri, belirli bir modalın görünürlüğünü değiştirir

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    // Liste modalının görünürlüğünü değiştirir
    toggleListModalVisible: (state, action) => {
      state.isListModalVisible = action.payload;
    },
    toggleDetailModalVisible: (state, action) => {
      state.isDetailModalVisible = action.payload;
    },
    toggleNewListModalVisible: (state, action) => {
      state.isNewListModalVisible = action.payload;
    },
    toggleNewTaskModalVisible: (state, action) => {
      state.isNewTaskModalVisible = action.payload;
    },
    toggleEditModalVisible: (state, action) => {
      state.isEditModalVisible = action.payload;
    },
  },
});

export const {toggleListModalVisible,toggleDetailModalVisible,toggleNewListModalVisible,toggleNewTaskModalVisible,toggleEditModalVisible} = modalSlice.actions;

export const selectListModalVisible = state => state.modals.isListModalVisible;
export const selectDetailModalVisible = state => state.modals.isDetailModalVisible;
export const selectNewListModalVisible = state => state.modals.isNewListModalVisible;
export const selectNewTaskModal = state => state.modals.isNewTaskModalVisible;
export const selectEditModalVisible = state => state.modals.isEditModalVisible;


export default modalSlice.reducer;
