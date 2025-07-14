import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api-todolist-multiuser.onrender.com/Duc/contacts';

// Hàm fetch ảnh qua proxy để tránh lỗi CORS, rồi convert sang base64
function toBase64FromUrl(url) {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    return fetch(proxyUrl)
        .then(res => res.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        }));
}

// GET contacts
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const res = await axios.get(API_URL);
    const contacts = res.data;

    console.log("🚀 Danh sách lấy từ API:", contacts);

    const converted = await Promise.all(
        contacts.map(async (c) => {
            let avatar = c.avatar;

            // Nếu không có avatar, tự tạo link robohash
            if (!avatar) {
                avatar = `https://robohash.org/${c.id}.png`;
            }

            if (avatar.startsWith('http')) {
                try {
                    const base64 = await toBase64FromUrl(avatar);
                    console.log(`✅ Avatar ID ${c.id} converted:`, base64.slice(0, 50));
                    avatar = base64;
                } catch (err) {
                    console.warn(`❌ Convert avatar lỗi tại ID ${c.id}`, err);
                }
            }

            return {
                ...c,
                avatar
            };
        })
    );

    return converted;
});


// POST: thêm liên hệ
export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
    const res = await axios.post(API_URL, contact);
    return res.data;
});

// PUT: cập nhật liên hệ
export const updateContact = createAsyncThunk('contacts/updateContact', async ({id, contact}) => {
    const res = await axios.put(`${API_URL}/${id}`, contact);
    return res.data;
});

// DELETE: xóa liên hệ
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Slice chính
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
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(c => c.id !== action.payload);
            });
    },
});

export const {setSearch} = contactSlice.actions;
export default contactSlice.reducer;
