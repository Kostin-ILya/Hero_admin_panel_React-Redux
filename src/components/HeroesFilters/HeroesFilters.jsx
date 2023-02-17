import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clsx } from 'clsx'

import Spinner from '../Spinner/Spinner'

import { fetchFilters, activeFilterChanged } from '../../features/filtersSlice'

const HeroesFilters = () => {
  const { filters, activeFilter, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFilters())
  }, [])

  const onChangeActiveFilter = (filter) => {
    dispatch(activeFilterChanged(filter))
  }

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map(({ value, label, clazz }) => (
            <button
              key={value}
              className={clsx('btn', clazz, {
                active: activeFilter === value,
              })}
              onClick={() => onChangeActiveFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters
