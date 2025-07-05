import {ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT} from './productActions';

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {...state, products: [...state.products, action.payload]};
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((p) =>
                    p.id === action.payload.id ? action.payload : p
                ),
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((p) => p.id !== action.payload),
            };
        default:
            return state;
    }
};

export default productReducer;
