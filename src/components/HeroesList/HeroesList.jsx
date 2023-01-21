import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useHTTP from '../../hooks/useHTTP'

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from '../../actions'
import HeroesListItem from '../HeroesListItem/HeroesListItem'
import Spinner from '../Spinner/Spinner'

const HeroesList = () => {
  const { heroes, heroesLoadingStatus } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { request } = useHTTP()

  useEffect(() => {
    dispatch(heroesFetching())
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))
  }, [])

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} {...props} />
    })
  }

  const elements = renderHeroesList(heroes)
  return <ul>{elements}</ul>
}

export default HeroesList
