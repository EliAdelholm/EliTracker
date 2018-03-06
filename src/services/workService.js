

// import schemas and helpers
import Schemas from './Schemas';
import { convertToJson } from '../helpers/ServiceHelper';


export const fetchWorkDataAsync = async () => {
    const response = await fetch(`http://localhost:3001/work`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const responseData = await convertToJson(response);
    console.log(responseData)

    return Schemas.normalize(responseData, [Schemas.job]);
};