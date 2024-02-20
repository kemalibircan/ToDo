import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './src/slices/modalSlice'
import userProfileReducer from './src/slices/userProfileSlice'
import taskReducer from './src/slices/taskSlice'

export const store = configureStore({
               reducer: {
               modals:modalReducer,
               userProfile:userProfileReducer,
               task:taskReducer
               },
})
