import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://code-decode-back-end-ztb6.vercel.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

