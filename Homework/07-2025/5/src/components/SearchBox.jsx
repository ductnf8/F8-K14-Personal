import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSearch} from '../store/contactSlice';

const SearchBox = () => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.contacts.search);

    return (
        <input
            type='text'
            placeholder='Tìm kiếm theo tên hoặc email...'
            value={search}
            onChange={e => dispatch(setSearch(e.target.value))}
            style={{
                padding: '0.5rem',
                marginBottom: '1rem',
                width: '100%',
                fontSize: '1rem'
            }}
        />
    );
};

export default SearchBox;
