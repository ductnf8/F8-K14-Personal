import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addContact} from '../store/contactSlice';

const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: '', // dạng base64
    position: '',
    bio: '',
    website: ''
};

const ContactForm = () => {
    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm({...form, avatar: reader.result});
        };
        reader.readAsDataURL(file); // Chuyển ảnh thành base64
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {firstName, lastName, email, phone, avatar} = form;
        if (!firstName || !lastName || !email || !phone || !avatar) {
            alert('Vui lòng nhập đầy đủ các trường bắt buộc.');
            return;
        }
        console.log('BASE64:', form.avatar);

        dispatch(addContact(form));
        setForm(initialForm);
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: '2rem'}}>
            <input name='firstName' placeholder='First Name*' value={form.firstName} onChange={handleChange}/>
            <input name='lastName' placeholder='Last Name*' value={form.lastName} onChange={handleChange}/>
            <input name='email' placeholder='Email*' value={form.email} onChange={handleChange}/>
            <input name='phone' placeholder='Phone*' value={form.phone} onChange={handleChange}/>
            <input name='position' placeholder='Position' value={form.position} onChange={handleChange}/>
            <input name='website' placeholder='Website' value={form.website} onChange={handleChange}/>
            <textarea name='bio' placeholder='Bio' value={form.bio} onChange={handleChange}/>

            <label>Avatar (hình ảnh)*:</label>
            <input type="file" accept="image/*" onChange={handleImage}/>

            {form.avatar && <img src={form.avatar} alt="Preview" style={{width: '100px', marginTop: '10px'}}/>}

            <button type='submit'>➕ Thêm mới</button>

            <style>{`
                input, textarea {
                    display: block;
                    margin-bottom: 0.5rem;
                    padding: 0.5rem;
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                }

                button {
                    padding: 0.5rem 1rem;
                    background: #2b8a3e;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 6px;
                }

                textarea {
                    min-height: 80px;
                    resize: vertical;
                }
            `}</style>
        </form>
    );
};

export default ContactForm;
