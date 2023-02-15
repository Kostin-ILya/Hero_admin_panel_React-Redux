import { createAction } from '@reduxjs/toolkit'

const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching())
  request('http://localhost:3001/heroes/')
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()))
}

const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching())
  request('http://localhost:3001/filters/')
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()))
}

const heroesFetching = createAction('HEROES_FETCHING')
const heroesFetched = createAction('HEROES_FETCHED')
const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')
const heroDeleted = createAction('HERO_DELETED')
const heroCreated = createAction('HERO_CREATED')

const filtersFetching = createAction('FILTERS_FETCHING')
const filtersFetched = createAction('FILTERS_FETCHED')
const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR')
const activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED')

export {
  fetchHeroes,
  fetchFilters,
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
  heroCreated,
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
}

// const heroesFetching = () => {
//   return {
//     type: 'HEROES_FETCHING',
//   }
// }
// const heroesFetched = (heroes) => {
//   return {
//     type: 'HEROES_FETCHED',
//     payload: heroes,
//   }
// }
// const heroesFetchingError = () => {
//   return {
//     type: 'HEROES_FETCHING_ERROR',
//   }
// }
// const heroDeleted = (id) => {
//   return {
//     type: 'HERO_DELETED',
//     payload: id,
//   }
// }
// const heroCreated = (newHero) => {
//   return {
//     type: 'HERO_CREATED',
//     payload: { newHero },
//   }
// }
// const filtersFetching = () => {
//   return {
//     type: 'FILTERS_FETCHING',
//   }
// }
// const filtersFetched = (filters) => {
//   return {
//     type: 'FILTERS_FETCHED',
//     payload: filters,
//   }
// }
// const filtersFetchingError = () => {
//   return {
//     type: 'FILTERS_FETCHING_ERROR',
//   }
// }
// const activeFilterChanged = (filter) => {
//   return {
//     type: 'ACTIVE_FILTER_CHANGED',
//     payload: filter,
//   }
// }
