import { ToastContainer } from 'react-toastify'

import HeroesList from '../HeroesList/HeroesList'
import HeroesAddForm from '../HeroesAddForm/HeroesAddForm'
import HeroesFilters from '../HeroesFilters/HeroesFilters'

import 'react-toastify/dist/ReactToastify.min.css'
import './app.scss'

const App = () => {
  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default App
