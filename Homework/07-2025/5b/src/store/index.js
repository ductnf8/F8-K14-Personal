import {configureStore} from '@reduxjs/toolkit';
import contactReducer from './contact/contactSlide.js';

export const store = configureStore({
    reducer: {
        contact: contactReducer
    }
});
