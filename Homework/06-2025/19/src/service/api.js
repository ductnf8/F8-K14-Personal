import axios from "axios";

const BASE_URL = 'https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Error 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh = localStorage.getItem('refresh_token');
                const response = await axios.post(`${BASE_URL}/login/get_new_token/`, {
                    refresh
                });

                const newAccessToken = response.data.access;
                localStorage.setItem('access_token', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                alert("Expired token");
                window.location.href = "/";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

const get = async (endpoint) => {
    const res = await api.get(endpoint);
    return res.data;
};

const post = async (endpoint, body) => {
    const res = await api.post(endpoint, body);
    return res.data;
};

export {get, post};
