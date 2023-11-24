import 'dotenv/config'
import axios from 'axios'; //just an example how we can save the token or private key

export const instanciaAxios = axios.create({
    baseURL: 'https://api.example.com/test',
    headers: {
        authorization: `Bearer ${process.env.API_PRIVATE_KEY}`,
        'Content-type': 'application/x-www-form-url-urlencoded'
    }
});