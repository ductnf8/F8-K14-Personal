import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import {store, fetchProducts} from "./store/index.js";
// import {fetchProducts} from "./store/Product/index.js";

const {dispatch} = store

dispatch(fetchProducts())

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>,
)
