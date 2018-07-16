import { combineReducers } from 'redux'
import jobReducer from './jobReducer'
import payPeriodReducer from './payPeriodReducer';
import hourLogReducer from './hourLogReducer';

const rootReducer = combineReducers({
  jobs: jobReducer,
  payPeriods: payPeriodReducer,
  hourLogs: hourLogReducer,
})

export default rootReducer