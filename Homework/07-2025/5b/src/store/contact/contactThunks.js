import {createAsyncThunk} from "@reduxjs/toolkit";
import {ADD_CONTACT, DELETE_CONTACT, FETCH_CONTACTS, UPDATE_CONTACT} from "./contactConstants.js";
import axios from "axios";

const API_URL = 'https://api-todolist-multiuser.onrender.com/Duc/contacts'

export const fetchContacts = createAsyncThunk(FETCH_CONTACTS, async () => {
    const res = await axios.get(API_URL)
    return res.data
})

export const addContact = createAsyncThunk(ADD_CONTACT, async (contact) => {
    const res = await axios.post(API_URL, contact)
    return res.data
})

export const updateContact = createAsyncThunk(UPDATE_CONTACT, async ({id, data}) => {
    const res = await axios.put(`${API_URL}/${id}`, data)
    return res.data
})

export const deleteContact = createAsyncThunk(DELETE_CONTACT, async ({id}) => {
    const res = await axios.delete(`${API_URL}/${id}`)
    return res.data
})

