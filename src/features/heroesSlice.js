import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import useHTTP from '../hooks/useHTTP'

const _baseApi = 'https://63e513d9c04baebbcdb33a8e.mockapi.io/heroes'

const heroesAdapter = createEntityAdapter()
const { request } = useHTTP()

const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  return await request(_baseApi)
})

const deleteHero = createAsyncThunk(
  'heroes/deleteHero',
  async ({ id, name }) => {
    return toast
      .promise(request(`${_baseApi}/${id}`, 'DELETE'), {
        pending: 'Deleting a hero...',
        success: `${name} deleted!`,
        error: 'Deleting Error',
      })
      .then((res) => res.id)
  }
)

const addHero = createAsyncThunk('heroes/addHero', async (newHero) => {
  return toast.promise(request(_baseApi, 'POST', newHero), {
    pending: 'Adding a hero...',
    success: `${newHero.name} added!`,
    error: 'Adding error',
  })
})

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
})

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
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
      .addCase(deleteHero.fulfilled, heroesAdapter.removeOne)
      .addCase(addHero.fulfilled, heroesAdapter.addOne)
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

const { reducer } = heroesSlice

export { fetchHeroes, deleteHero, addHero, filteredHeroesSelector }
export default reducer
