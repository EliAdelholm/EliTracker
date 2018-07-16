import { batchActions } from 'redux-batched-actions';

import * as WorkService from '../services/workService';

export const JOB_ADDED = 'job/JOB_ADDED';
const addJob = (jobs = {}) => ({
    type: JOB_ADDED,
    payload: jobs,
});

export const PAY_PERIOD_ADDED = 'payPeriod/PAY_PERIOD_ADDED';
const addPayPeriod = (payPeriods = {}) => ({
    type: PAY_PERIOD_ADDED,
    payload: payPeriods,
});

export const HOUR_LOG_ADDED = 'hourLog/HOUR_LOG_ADDED';
const addHourLog = (hourLogs = {}) => ({
    type: HOUR_LOG_ADDED,
    payload: hourLogs,
});

export const HOUR_LOG_DELETED = 'hourLog/HOUR_LOG_DELETED';
const deleteHourLog = (id) => ({
    type: HOUR_LOG_DELETED,
    payload: id,
});

export const fetchJobs = () => {
    return async (dispatch) => {
        const response = await WorkService.fetchJobsAsync();

        dispatch(batchActions([
            addJob(response.entities.jobs),
        ]));
    }
};

export const fetchPayPeriods = () => {
    return async (dispatch) => {
        const response = await WorkService.fetchPayPeriodsAsync();

        dispatch(batchActions([
            addPayPeriod(response.entities.payPeriods),
        ]));
    }
};

export const fetchHourLogs = () => {
    return async (dispatch) => {
        const response = await WorkService.fetchHourLogsAsync();

        dispatch(batchActions([
            addHourLog(response.entities.hourLogs),
        ]));
    }
};

export const addNewHourLog = (hourLog) => {
    return async (dispatch) => {
        const response = await WorkService.addHourLogAsync(hourLog);

        dispatch(batchActions([
            addHourLog(response.entities.hourLogs),
        ]));
    }
};

export const updateHourLog = (hourLog) => {
    return async (dispatch) => {
        const response = await WorkService.updateHourLogAsync(hourLog);

        dispatch(batchActions([
            addHourLog(response.entities.hourLogs),
        ]));
    }
};

export const deleteOneHourLog = (id) => {
    return async (dispatch) => {
        const response = await WorkService.deleteHourLogAsync(id);

        dispatch(batchActions([
            deleteHourLog(response.id),
        ]));
    }
};