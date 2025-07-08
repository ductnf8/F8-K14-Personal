import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addContact} from '../store/contactSlice';

const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: ''
};

const ContactForm = () => {
    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra các trường bắt buộc
        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.avatar) {
            alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        dispatch(addContact(form));
        setForm(initialForm); // Reset form
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: '2rem'}}>
            <input name='firstName' placeholder='First Name' value={form.firstName} onChange={handleChange}/>
            <input name='lastName' placeholder='Last Name' value={form.lastName} onChange={handleChange}/>
            <input name='email' placeholder='Email' value={form.email} onChange={handleChange}/>
            <input name='phone' placeholder='Phone' value={form.phone} onChange={handleChange}/>
            <input name='avatar' placeholder='Avatar URL' value={form.avatar} onChange={handleChange}/>
            <button type='submit'>➕ Thêm mới</button>
            <style>{`
                input {
                    display: block;
                    margin-bottom: 0.5rem;
                    padding: 0.5rem;
                    width: 100%;
                }

                button {
                    padding: 0.5rem 1rem;
                    background: #2b8a3e;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            `}</style>
        </form>
    );
};

export default ContactForm;
