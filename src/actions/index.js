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
const deleteHero = (id) => {
  return {
    type: 'DELETE_HERO',
    payload: id,
  }
}

export { heroesFetching, heroesFetched, heroesFetchingError, deleteHero }
