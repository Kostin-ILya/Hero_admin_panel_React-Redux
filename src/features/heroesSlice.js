import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import useHTTP from '../hooks/useHTTP'

const heroesAdapter = createEntityAdapter()
const { request } = useHTTP()

const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  return await request('https://63e513d9c04baebbcdb33a8e.mockapi.io/heroes')
})

const deleteHero = createAsyncThunk(
  'heroes/deleteHero',
  async ({ id, name }) => {
    try {
      const res = await request(
        `https://63e513d9c04baebbcdb33a8e.mockapi.io/heroes/${id}`,
        'DELETE'
      )
      toast.success(`${name} deleted!`)
      return res.id
    } catch (e) {
      toast.error('Deleting Error')
      console.log(e)
    }
  }
)

const addHero = createAsyncThunk('heroes/addHero', async (newHero) => {
  try {
    const res = await request(
      'https://63e513d9c04baebbcdb33a8e.mockapi.io/heroes',
      'POST',
      newHero
    )
    toast.success(`${newHero.name} added!`)
    return res
  } catch (e) {
    toast.error('Adding error')
    console.log(e)
  }
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
