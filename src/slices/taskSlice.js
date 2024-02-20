import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskName:null,
  taskId:null,
  taskCounter:1,
  editTaskId:null
};

export const taskSlice = createSlice({
  name:'task',
  initialState,
  reducers: {
    setTaskName: (state, action) => {
      state.taskName = action.payload;
    },
    setTaskId: (state, action) => {
      state.taskId = action.payload;
    },
    setTaskCounter: (state, action) => {
      state.taskCounter = action.payload;
    },
    setEditTaskId: (state, action) => {
      state.editTaskId = action.payload;
    },
    
    
    
    // Diğer bilgiler için benzer reducer işlevleri eklenebilir
  },
});

export const { setTaskName,setTaskId,setTaskCounter ,setEditTaskId} = taskSlice.actions;

export const selectTaskName = state =>state.task.taskName;
export const selectTaskId = state =>state.task.taskId;
export const selectTaskCounter = state =>state.task.taskCounter;
export const selectEditTaskId = state =>state.task.editTaskId;


export default taskSlice.reducer;
