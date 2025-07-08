// components/ContactForm.jsx
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {addContact, updateContact} from '../store/contact/contactThunks';

/**
 * Form thêm/sửa liên hệ.
 * Nếu có `contact` thì là chế độ chỉnh sửa, ngược lại là thêm mới.
 */
const ContactForm = ({contact, setEditingContact}) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        avatar: ''
    });

    // Khi bắt đầu chỉnh sửa -> đổ dữ liệu vào form
    useEffect(() => {
        if (contact) {
            setFormData(contact);
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                avatar: ''
            });
        }
    }, [contact]);

    // Xử lý input thay đổi
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Kiểm tra form hợp lệ
    const isValid = () => {
        return formData.firstName && formData.lastName && formData.email && formData.phone;
    };

    // Gửi form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid()) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        if (contact) {
            dispatch(updateContact({id: contact.id, data: formData}));
        } else {
            dispatch(addContact(formData));
        }

        setEditingContact(null); // đóng chế độ sửa
        setFormData({firstName: '', lastName: '', email: '', phone: '', avatar: ''});
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h2>{contact ? 'Chỉnh sửa liên hệ' : 'Thêm mới liên hệ'}</h2>

            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName}
                   onChange={handleChange}/>
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName}
                   onChange={handleChange}/>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}/>
            <input type="text" name="avatar" placeholder="Avatar URL" value={formData.avatar} onChange={handleChange}/>

            <button type="submit">{contact ? 'Lưu thay đổi' : 'Thêm mới'}</button>
            {contact && <button type="button" onClick={() => setEditingContact(null)}>Huỷ</button>}
        </form>
    );
};

export default ContactForm;
