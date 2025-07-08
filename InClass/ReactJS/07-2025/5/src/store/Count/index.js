import {createSlice} from '@reduxjs/toolkit'

const countSlide = createSlice({
    name: 'count',
    initialState: 10,
    reducers: {
        increase: (state) => {
            return state + 1
        }
    }
})

export default countSlide
export const {increase} = countSlide.actions