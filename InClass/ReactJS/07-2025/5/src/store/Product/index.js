import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../plugins/api.js";

const fetchProducts = createAsyncThunk(
    'products/fetch',
    async () => {
        const {data} = await api().get('/products')
        console.log(data)
    }
)

const productsSlide = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        addNew: (state, action) => {
            state.push(action.payload)
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            console.log('fetch ok')
        })
        builder.addCase(fetchProducts.pending, (state, action) => {
            console.log('pending')
        })
    }
})

export default productsSlide
export const {addNew} = productsSlide.actions
export {
    fetchProducts
}