import axios from "axios";

const BASE_URL = 'http://localhost:3000'


export const getProducts = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/products`)
        console.log(res.data, "res")
        return res.data
    } catch (e) {
        console.log(e.message)
        return []
    }
}

export const addPro = async (product) => {
    try {
        const res = await axios.post(`${BASE_URL}/products`, product)
        return res.data
    } catch (e) {
        console.log(e.message)
        return null
    }
}

export const updatePro = async (product) => {
    try {
        const res = await axios.put(`${BASE_URL}/${product.id}`, product)
        return res.data
    } catch (e) {
        console.log(e.message)
        return null
    }
}

export const deletePro = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`)
        return res.data
    } catch (e) {
        console.log(e.message)
        return null
    }
}

export const getCate = async () => {
    const res = await axios.get(`${BASE_URL}/categories`)
    return res.data
}
