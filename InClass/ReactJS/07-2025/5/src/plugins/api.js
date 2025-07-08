import axios from 'axios'

const api = () => axios.create({
    baseURL: 'https://fakestoreapi.com', // ✅ dùng HTTPS!
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
