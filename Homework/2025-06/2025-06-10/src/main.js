document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const errorEl = document.getElementById('error');

    if (!form || !emailEl || !passwordEl || !errorEl) {
        console.error('Không tìm thấy phần tử cần thiết trong DOM');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailEl.value.trim();
        const password = passwordEl.value.trim();
        errorEl.textContent = ''; // Clear lỗi cũ

        try {
            const response = await fetch('https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            console.log('Login API status:', response.status);
            const data = await response.json();
            console.log('Login API response:', data);

            if (response.ok && data.access && data.refresh) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                window.location.href = './home.html';
            } else {
                throw new Error(data.message || 'API không trả về access_token và refresh_token');
            }
        } catch (err) {
            console.error('Lỗi khi login:', err);
            errorEl.textContent = err.message;
        }
    });
});
