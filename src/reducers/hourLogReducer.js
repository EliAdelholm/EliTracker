import { HOUR_LOG_ADDED, HOUR_LOG_DELETED } from '../actions/workActionCreator';

export default (state = {}, action) => {

    if (action.type === HOUR_LOG_ADDED) {
        return {
            ...state,
            ...action.payload
        }
    }

    if (action.type === HOUR_LOG_DELETED) {
        const nextState = {...state};
        
        delete nextState[action.payload];
        return nextState;
    }

    return state;
}