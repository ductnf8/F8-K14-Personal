// Lưu & lấy dữ liệu từ localStorage

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export function saveTokens(accessToken, refreshToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
}
