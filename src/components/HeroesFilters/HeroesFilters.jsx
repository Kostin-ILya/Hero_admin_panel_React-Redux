import { useDispatch, useSelector } from 'react-redux'
import { clsx } from 'clsx'

import { useGetFiltersQuery } from '../../api/api'
import { activeFilterChanged } from '../../features/filtersSlice'

import Spinner from '../Spinner/Spinner'

const HeroesFilters = () => {
  const activeFilter = useSelector((state) => state.filters.activeFilter)
  const { data: filters, isError, isLoading } = useGetFiltersQuery()
  const dispatch = useDispatch()

  const onChangeActiveFilter = (filter) => {
    dispatch(activeFilterChanged(filter))
  }

  if (isLoading) return <Spinner />
  else if (isError) return <h5 className="text-center mt-5">Ошибка загрузки</h5>

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
