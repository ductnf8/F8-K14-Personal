import {v4 as uuidv4} from 'uuid';
import {ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT} from './actionTypes';

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: {...product, id: uuidv4()},
});

export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product,
});

export const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: id,
});
