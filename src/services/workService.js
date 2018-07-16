

// import schemas and helpers
import Schemas from './Schemas';
import { convertToJson } from '../helpers/ServiceHelper';


export const fetchJobsAsync = async () => {
    const response = await fetch(`http://localhost:3001/api/jobs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await convertToJson(response);

    return Schemas.normalize(responseData, [Schemas.job]);
};

export const fetchPayPeriodsAsync = async () => {
    const response = await fetch(`http://localhost:3001/api/job-periods`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await convertToJson(response);

    return Schemas.normalize(responseData, [Schemas.payPeriod]);
};

export const fetchHourLogsAsync = async () => {
    const response = await fetch(`http://localhost:3001/api/job-hour-logs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await convertToJson(response);

    return Schemas.normalize(responseData, [Schemas.hourLog]);
};

export const addHourLogAsync = async (hourLog) => {
    const response = await fetch(`http://localhost:3001/api/hour-log`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hourLog)
    });
    const responseData = await convertToJson(response);
    console.log(responseData, response)

    return Schemas.normalize(responseData, Schemas.hourLog);
};

export const updateHourLogAsync = async (hourLog) => {
    const response = await fetch(`http://localhost:3001/api/hour-log`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hourLog)
    });
    const responseData = await convertToJson(response);
    console.log(responseData, response)

    return Schemas.normalize(responseData, Schemas.hourLog);
};

export const deleteHourLogAsync = async (id) => {
    const response = await fetch(`http://localhost:3001/api/hour-log/${id}`, {
        method: "GET",
    });

    const responseData = await convertToJson(response);
    console.log(responseData)

    return responseData;
};