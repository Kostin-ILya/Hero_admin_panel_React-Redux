import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { toast } from 'react-toastify'

import {
  fetchHeroes,
  deleteHero,
  filteredHeroesSelector,
} from '../../features/heroesSlice'
import HeroesListItem from '../HeroesListItem/HeroesListItem'
import Spinner from '../Spinner/Spinner'

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector)
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHeroes())
  }, [])

  const onDeleteHero = useCallback((id, name) => {
    dispatch(deleteHero({ id, name }))
  }, [])

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />
  } else if (heroesLoadingStatus === 'error') {
    toast.error('Loading Error')
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
