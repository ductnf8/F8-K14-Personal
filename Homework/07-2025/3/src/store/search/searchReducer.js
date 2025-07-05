const initialState = {
    searchStr: '',
};

const searchReducer = (state = initialState, action) => {
    if (action.type === 'SEARCH_STR') {
        return {...state, searchStr: action.payload};
    }
    return state;
};

export default searchReducer;
