import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://vercel.com/shrijit-dhandes-projects/code-decode-front-end-ztb6',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

