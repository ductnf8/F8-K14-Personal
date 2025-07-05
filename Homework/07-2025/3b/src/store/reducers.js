import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    SEARCH_STR,
} from './actionTypes';

const initialState = {
    products: [],
    searchStr: '',
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
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
        case SEARCH_STR:
            return {
                ...state,
                searchStr: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
