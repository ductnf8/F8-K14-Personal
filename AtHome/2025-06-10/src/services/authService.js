// src/services/authService.js
import {authAPI} from '../api/authAPI.js';

export const authService = {
    async login({email, password}) {
        const data = await authAPI.login(email, password);
        return data; // dữ liệu chứa token
    }
};
