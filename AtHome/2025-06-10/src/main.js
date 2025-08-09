// src/main.js
import {authService} from './services/authService.js';

const form = document.querySelector('#form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errorEl = document.querySelector('#error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
        const user = await authService.login({email, password});

        // Nếu login thành công, lưu token và chuyển trang
        if (user.token) {
            localStorage.setItem('token', user.token); // 👈 Đảm bảo dòng này chạy
            window.location.href = 'home.html';
        } else {
            throw new Error('Login failed: no token returned');
        }
    } catch (err) {
        errorEl.textContent = err.message || 'Login failed';
    }
});
