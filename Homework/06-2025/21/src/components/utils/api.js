import axios from "axios"

const BASE_URL = 'https://api-todolist-multiuser.onrender.com/Duc/todos'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const get = async (endpoint) => {
    const res = await api.get(endpoint)
    return res.data
}

export const post = async (endpoint, body) => {
    const res = await api.post(endpoint, body);
    return res.data;
}

export const put = async (endpoint, body) => {
    const res = await api.patch(endpoint, body);
    return res.data;
}

export const del = async (endpoint) => {
    const res = await api.delete(endpoint);
    return res.data;
}