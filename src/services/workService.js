

// import schemas and helpers
import Schemas from './Schemas';
import { convertToJson } from '../helpers/ServiceHelper';


export const fetchJobsAsync = async () => {
    const response = await fetch(`http://localhost:3001/jobs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await convertToJson(response);

    return Schemas.normalize(responseData, [Schemas.job]);
};