import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://viacep.com.br/ws',
    headers: {
        "content-type": "application/json",
    }
})


export default axiosInstance;