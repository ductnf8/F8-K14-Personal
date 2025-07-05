import {combineReducers, createStore} from 'redux';
import productReducer from './product/productReducer';
import searchReducer from './search/searchReducer';

const rootReducer = combineReducers({
    product: productReducer,
    search: searchReducer,
});

const store = createStore(rootReducer);

export default store;
