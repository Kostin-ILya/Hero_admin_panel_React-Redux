const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  }
}
const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  }
}
const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  }
}
const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHING',
  }
}
const filtersFetched = (filters) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters,
  }
}
const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR',
  }
}
const activeFilterChanged = (filter) => {
  return {
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter,
  }
}

const heroDeleted = (id) => {
  return {
    type: 'HERO_DELETED',
    payload: id,
  }
}

const heroCreated = (newHero) => {
  return {
    type: 'HERO_CREATED',
    payload: { newHero },
  }
}

export {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
  heroDeleted,
  heroCreated,
}
