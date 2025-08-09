// src/api/authAPI.js
const BASE_URL = 'https://api-exercise-somee.onrender.com/api/v1/auth';

export const authAPI = {
    async login(email, password) {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await res.json();
        return data; // 👈 kiểm tra xem có data.token không
    }
};
