import { combineReducers } from 'redux'

import filters from './filters'
import heroes from './heroes'

export default combineReducers({ heroes, filters })
