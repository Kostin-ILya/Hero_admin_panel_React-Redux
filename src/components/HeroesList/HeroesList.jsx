import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import useHTTP from '../../hooks/useHTTP'

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
} from '../../actions'
import HeroesListItem from '../HeroesListItem/HeroesListItem'
import Spinner from '../Spinner/Spinner'

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, activeFilter } = useSelector(
    (state) => state
  )
  const dispatch = useDispatch()
  const { request } = useHTTP()

  const requestUrl = 'http://localhost:3001/heroes/'

  useEffect(() => {
    dispatch(heroesFetching())
    request(requestUrl)
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))
  }, [])

  const onDeleteHero = useCallback((id) => {
    request(`${requestUrl}${id}`, 'delete')
      .then(() => dispatch(heroDeleted(id)))
      .catch((e) => console.error('Fetching error', e))
  }, [])

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={500} classNames="hero__item">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      )
    }

    return arr
      .filter(({ element }) => {
        return activeFilter === 'all' || element === activeFilter
      })
      .map(({ id, ...props }) => {
        return (
          <CSSTransition key={id} timeout={500} classNames="hero__item">
            <HeroesListItem id={id} onDeleteHero={onDeleteHero} {...props} />
          </CSSTransition>
        )
      })
  }

  return (
    <>
      <TransitionGroup component={'ul'}>
        {renderHeroesList(heroes)}
      </TransitionGroup>
    </>
  )
}

export default HeroesList
