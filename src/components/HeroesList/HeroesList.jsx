import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { createSelector } from '@reduxjs/toolkit'

import useHTTP from '../../hooks/useHTTP'

import { fetchHeroes, heroDeleted } from '../../features/heroesSlice'
import HeroesListItem from '../HeroesListItem/HeroesListItem'
import Spinner from '../Spinner/Spinner'

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.heroes.heroes,
    (state) => state.filters.activeFilter,
    (heroes, activeFilter) =>
      activeFilter === 'all'
        ? heroes
        : heroes.filter((hero) => hero.element === activeFilter)
  )
  const filteredHeroes = useSelector(filteredHeroesSelector)
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  )

  const dispatch = useDispatch()

  const { request } = useHTTP()

  useEffect(() => {
    dispatch(fetchHeroes())
  }, [])

  const onDeleteHero = useCallback((id) => {
    request(`http://localhost:3001/heroes/${id}`, 'delete')
      .then(() => dispatch(heroDeleted(id)))
      .catch((e) => console.error('Fetching error', e))
  }, [])

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  return (
    <>
      <TransitionGroup component={'ul'}>
        {filteredHeroes.length === 0 ? (
          <CSSTransition timeout={500} classNames="hero__item">
            <h5 className="text-center mt-5">Героев пока нет</h5>
          </CSSTransition>
        ) : (
          filteredHeroes.map(({ id, ...props }) => {
            return (
              <CSSTransition key={id} timeout={500} classNames="hero__item">
                <HeroesListItem
                  id={id}
                  onDeleteHero={onDeleteHero}
                  {...props}
                />
              </CSSTransition>
            )
          })
        )}
      </TransitionGroup>
    </>
  )
}

export default HeroesList
