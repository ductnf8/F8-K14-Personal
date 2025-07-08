import {toast} from "react-toastify";
import axios from "axios";

const BASE_URL = 'https://dummyjson.com/users'

export const getEmployees = async () => {
    try {
        const res = await axios.get(BASE_URL)
        const data = res.data

        return data.users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age
        }))
    } catch (e) {
        console.log(e.message)
        toast(e.message)
        return []
    }
}

export const addEmp = async (employee) => {
    try {
        const res = await axios.post(`${BASE_URL}/add`, employee)
        return res.data
    } catch (e) {
        console.log(e.message)
        toast(e.message)
        return null
    }
}

export const updateEmp = async (employee) => {
    try {
        const res = await axios.put(`${BASE_URL}/${employee.id}`, employee)
        return res.data
    } catch (e) {
        console.log(e.message)
        toast(e.message)
        return null
    }
}

export const deleteEmp = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`)
        return res.data
    } catch (e) {
        console.log(e.message)
        toast(e.message)
        return null
    }
}