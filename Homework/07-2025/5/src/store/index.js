// Tạo Redux store, và export ra để dùng trong main.jsx
import {configureStore} from '@reduxjs/toolkit';
import contactReducer from './contactSlice';

export const store = configureStore({
    reducer: contactReducer, // Ở đây contactSlice đã là reducer object
});

export default store;
