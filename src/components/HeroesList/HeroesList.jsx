import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { toast } from 'react-toastify'

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/api'

import HeroesListItem from '../HeroesListItem/HeroesListItem'
import Spinner from '../Spinner/Spinner'

const HeroesList = () => {
  const activeFilter = useSelector((state) => state.filters.activeFilter)
  const { data: heroes, isError, isLoading } = useGetHeroesQuery()
  const [deleteHero] = useDeleteHeroMutation()

  const onDeleteHero = useCallback((id, name) => {
    deleteHero(id)
      .unwrap()
      .then(() => toast.success(`${name} deleted!`))
      .catch(() => toast.error('Deleting Error'))
  }, [])

  if (isLoading) return <Spinner />
  if (isError) {
    toast.error('Loading Error')
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  return (
    <>
      <TransitionGroup component={'ul'}>
        {heroes.length === 0 ? (
          <CSSTransition timeout={500} classNames="hero__item">
            <h5 className="text-center mt-5">Героев пока нет</h5>
          </CSSTransition>
        ) : (
          heroes
            .filter((hero) =>
              activeFilter === 'all' ? hero : hero.element === activeFilter
            )
            .map(({ id, ...props }) => (
              <CSSTransition key={id} timeout={500} classNames="hero__item">
                <HeroesListItem
                  id={id}
                  onDeleteHero={onDeleteHero}
                  {...props}
                />
              </CSSTransition>
            ))
        )}
      </TransitionGroup>
    </>
  )
}

export default HeroesList
