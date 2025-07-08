// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store/index.js';
import App from './App';
import './index.css'; // file CSS nếu có

// Bao bọc App bằng Provider để kết nối Redux
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
