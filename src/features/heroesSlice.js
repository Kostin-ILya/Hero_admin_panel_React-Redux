import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import useHTTP from '../hooks/useHTTP'

const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
  const { request } = useHTTP()

  return request('http://localhost:3001/heroes/')
})

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroCreated: (state, action) => {
      state.heroes.push(action.payload)
    },
    heroDeleted: (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading'
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle'
        state.heroes = action.payload
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error'
      })
      .addDefaultCase(() => {})
  },
})

const { heroCreated, heroDeleted } = heroesSlice.actions
const { reducer } = heroesSlice

export { fetchHeroes, heroCreated, heroDeleted }

export default reducer
