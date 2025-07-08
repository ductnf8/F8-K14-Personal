// components/SearchBar.jsx
import React from 'react';

/**
 * Input tìm kiếm liên hệ theo tên (first + last) hoặc email.
 * Lọc realtime theo mỗi lần gõ.
 */
const SearchBar = ({searchTerm, setSearchTerm}) => {
    return (
        <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
        />
    );
};

export default SearchBar;
