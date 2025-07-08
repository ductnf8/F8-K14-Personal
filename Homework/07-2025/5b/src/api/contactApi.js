import {toast} from "react-toastify";
import axios from "axios";

const BASE_URL = 'https://api-todolist-multiuser.onrender.com/Duc/contacts'

export const getContact = async () => {
    try {
        const res = await axios.get(BASE_URL)
        return res.data
    } catch (e) {
        console.log(e.message)
        toast.error('error')
        return []
    }
}

export const addContact = async (contact) => {
    try {
        const res = await axios.post(`${BASE_URL}`, contact)
        return res.data
    } catch (e) {
        console.log(e.message)
        toast('error')
        return null
    }
}

export const updateContact = async () => {
    try {

    } catch (e) {
        console.log(e.message)
        toast('error')
        return null
    }
}