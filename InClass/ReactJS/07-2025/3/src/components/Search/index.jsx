import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const Search = () => {
    const dispatch = useDispatch()
    const searchStr = useSelector(state => state.searchStr)

    return (
        <input value={searchStr || ''}
               onChange={(e) => dispatch({type: 'searchStr', value: e.target.value})}/>
    );
};

export default Search;
