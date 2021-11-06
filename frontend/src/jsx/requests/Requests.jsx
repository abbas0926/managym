import axios from 'axios';


const url = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});


export const getCiv = (body) => {
    let result = url
        .get('/clients')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
};