import { useDispatch, useSelector } from 'react-redux'
import useHTTP from '../../hooks/useHTTP'
import { useForm } from 'react-hook-form'

import { nanoid } from 'nanoid'

import { addHero } from '../../actions'

const HeroesAddForm = () => {
  const dispatch = useDispatch()
  const { request } = useHTTP()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = ({ name, text, element }) => {
    const newHero = { id: nanoid(), name, description: text, element }

    dispatch(addHero(newHero))

    request('http://localhost:3001/heroes', 'post', newHero)
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
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
        {errors?.element && errors?.element?.message}
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  )
}

export default HeroesAddForm
