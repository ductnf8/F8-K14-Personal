// components/ContactCard.jsx
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteContact} from '../store/contact/contactThunks';

/**
 * Hiển thị thông tin một liên hệ dạng card.
 * Gồm: Avatar, Tên, Email, SĐT và nút Sửa, Xoá.
 */
const ContactCard = ({contact, setEditingContact}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        const confirm = window.confirm(`Bạn có chắc muốn xoá ${contact.firstName}?`);
        if (confirm) {
            dispatch(deleteContact(contact.id));
        }
    };

    return (
        <div className="contact-card">
            <img src={contact.avatar} alt="Avatar" className="avatar"/>
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>

            <div className="card-actions">
                <button onClick={() => setEditingContact(contact)}>Sửa</button>
                <button onClick={handleDelete}>Xoá</button>
            </div>
        </div>
    );
};

export default ContactCard;
