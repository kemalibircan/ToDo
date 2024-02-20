import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './src/slices/modalSlice'
export const store = configureStore({
               reducer: {
               modals:modalReducer
               },
})
