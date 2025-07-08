import axios from "axios";

const BASE_URL = 'https://api-todolist-multiuser.onrender.com/Duc/contacts'

export const getContacts = async () => {
    try {
        const res = await axios.get(BASE_URL)
        return res.data
    } catch (e) {
        console.log(e.message)
        return []
    }
}

export const addC = async (contact) => {
    try {
        const res = await axios.post(`${BASE_URL}`, contact)
        return res.data
    } catch (e) {
        console.log(e.message)
    }
}

export const updateC = async (contact) => {
    try {
        const res = await axios.put(`${BASE_URL}/${contact.id}`, contact)
        return res.data
    } catch (e) {
        console.log(e.message)
    }
}

export const deleteC = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`)
        return res.data
    } catch (e) {
        console.log(e.message)
    }
}