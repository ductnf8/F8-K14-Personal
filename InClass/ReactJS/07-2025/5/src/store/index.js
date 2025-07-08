import {configureStore} from '@reduxjs/toolkit'
import countSlide from "./Count/index.js";
import productsSlide from "./Product/index.js";

const store = configureStore({
    reducer: {
        count: countSlide.reducer,
        products: productsSlide.reducer
    }
})

export {store}

export * from './Count'
export * from './Product'