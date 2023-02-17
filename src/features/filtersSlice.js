import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import useHTTP from '../hooks/useHTTP'

const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
  const { request } = useHTTP()

  return request('http://localhost:3001/filters/')
})

const initialState = {
  filtersLoadingStatus: 'idle',
  filters: [],
  activeFilter: 'all',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = 'loading'
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = 'idle'
        state.filters = action.payload
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = 'error'
      })
      .addDefaultCase(() => {})
  },
})

const { activeFilterChanged } = filtersSlice.actions
const { reducer } = filtersSlice

export { fetchFilters, activeFilterChanged }

export default reducer
