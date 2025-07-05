import {createStore} from "redux";

const initialState = {
    searchStr: null,
    products: [],
    count: 0
}

const searchStrReducer = (state = initialState.searchStr, action) => {
    if (action.type === 'searchStr') {
        return action.value
    }
    return state
}

const productReducer = (state = initialState.products, action) => {
    if (action.type === 'addNew') {
        return [...state, action.value]
    }

    if (action.type === 'delete') {
        const index = state.findIndex(p => p.id === action.value)
        state.splice(index, 1)
        return [...state]
    }
    return state
}

const countReducer = (state = initialState.count, action) => {
    if (action.type === 'count') {
        return state + 1
    }
    return state
}

const reducer = (state, action) => {
    return {
        searchStr: searchStrReducer(state.searchStr, action),
        products: productReducer(state.products, action),
        count: countReducer(state.count, action)
    }
}

const store = createStore(reducer, initialState)

export {
    store
}