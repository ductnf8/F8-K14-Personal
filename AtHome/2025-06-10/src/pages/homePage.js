import {getPostsAPI} from '../api/authAPI.js';
import {getAccessToken} from '../utils/storage.js';
import {logoutUser} from '../services/authService.js';

// Hiển thị danh sách bài viết
export async function renderHomePage() {
    const app = document.getElementById('app');
    app.innerHTML = `<h2>Loading posts...</h2>`;

    try {
        const posts = await getPostsAPI(getAccessToken());

        // Hiển thị nút logout
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.style.cssText = `
      margin: 10px 0;
      padding: 10px 16px;
      background: #ef5350;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
        logoutBtn.addEventListener('click', logoutUser);

        app.innerHTML = '<h2>Danh sách bài viết:</h2>';
        app.appendChild(logoutBtn);

        posts.forEach(post => {
            const div = document.createElement('div');
            div.style.cssText = 'padding: 10px; margin: 10px 0; background: #f5f5f5; border-radius: 6px;';
            div.innerHTML = `<h4>${post.title}</h4><p>${post.content}</p>`;
            app.appendChild(div);
        });
    } catch (err) {
        app.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}
