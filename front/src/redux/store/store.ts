import { configureStore } from '@reduxjs/toolkit'
import foldersReducer from '../features/Folder'
import translationReducer from '../features/Translation'
//import memosReducer from '../features/Memo'
import authReducer from '../features/Auth'

export const store = configureStore({
  reducer: {
    folder: foldersReducer,
    translation: translationReducer,
    //memo: memosReducer,
    auth: authReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch