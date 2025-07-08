// src/App.jsx
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    selectContacts,
    selectLoading,
    selectError
} from './store/contact/contactSelectors';
import {fetchContacts} from './store/contact/contactThunks';

import ContactCard from './components/ContactCard';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';

/**
 * Giao diện chính của ứng dụng.
 * Gồm: ô tìm kiếm, form thêm/sửa, danh sách liên hệ dưới dạng card.
 */
const App = () => {
    const dispatch = useDispatch();

    // Lấy state từ Redux store bằng selector
    const contacts = useSelector(selectContacts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [searchTerm, setSearchTerm] = useState('');
    const [editingContact, setEditingContact] = useState(null); // dùng khi bấm Edit

    // Gọi API lấy danh sách khi component mount
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    // Lọc liên hệ theo tên hoặc email
    const filteredContacts = contacts.filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="app-container">
            <h1>📇 Quản lý Danh bạ</h1>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <ContactForm contact={editingContact} setEditingContact={setEditingContact}/>

            {loading && <p>⏳ Đang tải danh bạ...</p>}
            {error && <p style={{color: 'red'}}>❌ Lỗi: {error}</p>}

            <div className="card-list">
                {filteredContacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        setEditingContact={setEditingContact}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
