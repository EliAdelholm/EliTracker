import { PAY_PERIOD_ADDED } from '../actions/workActionCreator';

export default (state = {}, action) => {

    if (action.type === PAY_PERIOD_ADDED) {
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
}