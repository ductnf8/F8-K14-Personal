import React from 'react';
import {useSelector} from 'react-redux';
import ContactCard from './ContactCard';

const ContactList = () => {
    const {items, loading, error, search} = useSelector(state => state);

    if (loading) return <p>Đang tải danh bạ...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    // Lọc theo tên (first + last) hoặc email
    const filtered = items.filter(c => {
        const fullName = (c.firstName + ' ' + c.lastName).toLowerCase();
        return (
            fullName.includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem'}}>
            {filtered.map(contact => (
                <ContactCard key={contact.id} contact={contact}/>
            ))}
        </div>
    );
};

export default ContactList;
