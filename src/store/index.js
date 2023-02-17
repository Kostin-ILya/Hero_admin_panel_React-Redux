import { configureStore } from '@reduxjs/toolkit'

import heroReducer from '../features/heroesSlice'
import filtersReducer from '../features/filtersSlice'

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    })
  }

  return next(action)
}

const store = configureStore({
  reducer: { heroes: heroReducer, filters: filtersReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
