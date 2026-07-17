import { configureStore } from '@reduxjs/toolkit'
import { studentsApi } from '../features/students/studentsApiSlice'

export const store = configureStore({
  reducer: {
    // RTK Query injects its own reducer + cache under this key
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  // The RTK Query middleware enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentsApi.middleware),
})
