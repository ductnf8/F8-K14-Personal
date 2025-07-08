// redux/contact/contactSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {
    fetchContacts,
    addContact,
    updateContact,
    deleteContact
} from './contactThunks';

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],     // Danh sách liên hệ
        loading: false,   // Trạng thái tải dữ liệu
        error: null       // Lỗi khi fetch
    },
    reducers: {},       // reducers nội bộ nếu có (hiện tại không dùng)

    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // ADD
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
            })

            // UPDATE
            .addCase(updateContact.fulfilled, (state, action) => {
                const idx = state.contacts.findIndex(c => c.id === action.payload.id);
                if (idx !== -1) {
                    state.contacts[idx] = action.payload;
                }
            })

            // DELETE
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(c => c.id !== action.payload);
            });
    }
});

export default contactSlice.reducer;
