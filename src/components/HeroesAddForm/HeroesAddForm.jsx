import { useForm } from 'react-hook-form'
import { nanoid } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'

import { useGetFiltersQuery, useAddHeroMutation } from '../../api/api'

const HeroesAddForm = () => {
  const { data: filters, isError, isLoading, isSuccess } = useGetFiltersQuery()

  const [addHero] = useAddHeroMutation()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async ({ name, text, element }) => {
    const newHero = { id: nanoid(), name, description: text, element }

    await addHero(newHero)
      .unwrap()
      .then(() => toast.success(`${name} added!`))
      .catch(() => toast.error('Adding error'))

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
          {isLoading ? (
            <option>Loading</option>
          ) : isError === 'error' ? (
            <option>Options loading error</option>
          ) : (
            isSuccess &&
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
