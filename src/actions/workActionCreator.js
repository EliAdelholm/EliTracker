import { batchActions } from 'redux-batched-actions';

import * as WorkService from '../services/workService';

export const JOB_ADDED = 'job/JOB_ADDED';
const addJob = (jobs = {}) => ({
    type: JOB_ADDED,
    payload: jobs,
});

export const fetchJobs = () => {
    return async (dispatch) => {
        const response = await WorkService.fetchJobsAsync();

        dispatch(batchActions([
            addJob(response.entities.jobs),
        ]));
    }
};