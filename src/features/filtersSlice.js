import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import useHTTP from '../hooks/useHTTP'

const filtersAdapter = createEntityAdapter({
  selectId: (filter) => filter.value,
})

const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
  const { request } = useHTTP()

  return request('http://localhost:3001/filters/')
})

const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
})

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
        filtersAdapter.setAll(state, action.payload)
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = 'error'
      })
      .addDefaultCase(() => {})
  },
})

const { selectAll } = filtersAdapter.getSelectors((state) => state.filters)

const { activeFilterChanged } = filtersSlice.actions
const { reducer } = filtersSlice

export { fetchFilters, activeFilterChanged, selectAll }
export default reducer
