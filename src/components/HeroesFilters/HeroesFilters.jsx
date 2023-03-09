import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clsx } from 'clsx'

import Spinner from '../Spinner/Spinner'

import {
  fetchFilters,
  activeFilterChanged,
  selectAll as selectAllFilters,
} from '../../features/filtersSlice'

const HeroesFilters = () => {
  const { activeFilter, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  )

  const filters = useSelector(selectAllFilters)

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
    toast.error('Loading Error')
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <h3 className="filter-title">Отфильтруйте героев по элементам</h3>
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
