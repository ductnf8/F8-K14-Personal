import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const SearchBox = () => {
    const dispatch = useDispatch();
    const keyword = useSelector((state) => state.search.searchStr);

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) =>
                    dispatch({type: 'SEARCH_STR', payload: e.target.value})
                }
            />
        </div>
    );
};

export default SearchBox;
