import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

import useHTTP from '../hooks/useHTTP'

const heroesAdapter = createEntityAdapter()

const { request } = useHTTP()

const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  return await request('http://localhost:3001/heroes/')
})

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
})

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroCreated: heroesAdapter.addOne,
    heroDeleted: heroesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading'
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle'

        heroesAdapter.setAll(state, action.payload)
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error'
      })
      .addDefaultCase(() => {})
  },
})

const { selectAll: selectAllHeroes } = heroesAdapter.getSelectors(
  (state) => state.heroes
)

const filteredHeroesSelector = createSelector(
  selectAllHeroes,
  (state) => state.filters.activeFilter,
  (heroes, activeFilter) =>
    activeFilter === 'all'
      ? heroes
      : heroes.filter((hero) => hero.element === activeFilter)
)

const { heroCreated, heroDeleted } = heroesSlice.actions
const { reducer } = heroesSlice

export { fetchHeroes, heroCreated, heroDeleted, filteredHeroesSelector }
export default reducer
