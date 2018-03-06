import { JOB_ADDED } from '../actions/workActionCreator';

export default (state = {}, action) => {

    if (action.type === JOB_ADDED) {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
}