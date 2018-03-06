import { combineReducers } from 'redux'
import jobReducer from './jobReducer'

const rootReducer = combineReducers({
  jobs: jobReducer,
})

export default rootReducer