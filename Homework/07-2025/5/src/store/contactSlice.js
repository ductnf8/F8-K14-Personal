import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api-todolist-multiuser.onrender.com/Duc/contacts';

// Async thunk: lấy danh sách liên hệ
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const res = await axios.get(API_URL);
    return res.data;
});

// Async thunk: thêm liên hệ
export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
    const res = await axios.post(API_URL, contact);
    return res.data;
});

// Async thunk: cập nhật liên hệ
export const updateContact = createAsyncThunk('contacts/updateContact', async ({id, contact}) => {
    const res = await axios.put(`${API_URL}/${id}`, contact);
    return res.data;
});

// Async thunk: xóa liên hệ
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
        search: '',
    },
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.items.findIndex(c => c.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(c => c.id !== action.payload);
            });
    },
});

export const {setSearch} = contactSlice.actions;
export default contactSlice.reducer;
