import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'

import useHTTP from '../../hooks/useHTTP'

import { heroCreated } from '../../actions'

const HeroesAddForm = () => {
  const { filters, filtersLoadingStatus } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { request } = useHTTP()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async ({ name, text, element }) => {
    const newHero = { id: nanoid(), name, description: text, element }

    await request('http://localhost:3001/heroes', 'post', newHero)
      .then(() => dispatch(heroCreated(newHero)))
      .catch((e) => console.error('Fetching error', e))

    reset()
  }

  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          {...register('name', {
            required: 'This field is required',
            minLength: { value: 3, message: 'Minimum of 3 characters' },
          })}
          type="text"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
        {errors?.name && (
          <div className="errors__msg"> {errors.name.message} </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          {...register('text', {
            required: 'This field is required',
            minLength: { value: 3, message: 'Minimum of 3 characters' },
          })}
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
        />
        {errors?.text && (
          <div className="errors__msg"> {errors.text.message} </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          {...register('element', {
            validate: (value) =>
              value !== 'title' || (
                <div className="errors__msg">Select the hero element</div>
              ),
          })}
          className="form-select"
          id="element"
        >
          <option value="title">Я владею элементом...</option>
          {filtersLoadingStatus === 'loading' ? (
            <option>Loading</option>
          ) : filtersLoadingStatus === 'error' ? (
            <option>Options loading error</option>
          ) : (
            filters.map(({ value, label }) => {
              if (value === 'all') return
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            })
          )}
        </select>
        {errors?.element && errors?.element?.message}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        Создать
      </button>
    </form>
  )
}

export default HeroesAddForm
