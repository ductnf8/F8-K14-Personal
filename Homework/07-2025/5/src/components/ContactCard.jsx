import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteContact, updateContact} from '../store/contactSlice';

const ContactCard = ({contact}) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState({...contact});

    const handleUpdate = () => {
        const {firstName, lastName, email, phone, avatar} = edited;
        if (!firstName || !lastName || !email || !phone || !avatar) {
            alert('Không được để trống trường nào!');
            return;
        }
        dispatch(updateContact({id: contact.id, contact: edited}));
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (confirm('Bạn có chắc chắn muốn xóa?')) {
            dispatch(deleteContact(contact.id));
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <button className="btn edit" onClick={() => setIsEditing(true)}>✏️ Sửa</button>
                <button className="btn delete" onClick={handleDelete}>🗑 Xoá</button>
            </div>

            {/*<img src={contact.avatar} alt="avatar" className="avatar"/>*/}
            <img
                src={contact.avatar}
                alt="avatar"
                className="avatar"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-avatar.png';
                }}
            />

            {isEditing ? (
                <div className="edit-form">
                    <input value={edited.firstName} placeholder="First Name"
                           onChange={e => setEdited({...edited, firstName: e.target.value})}/>
                    <input value={edited.lastName} placeholder="Last Name"
                           onChange={e => setEdited({...edited, lastName: e.target.value})}/>
                    <input value={edited.email} placeholder="Email"
                           onChange={e => setEdited({...edited, email: e.target.value})}/>
                    <input value={edited.phone} placeholder="Phone"
                           onChange={e => setEdited({...edited, phone: e.target.value})}/>
                    <input value={edited.avatar} placeholder="Avatar URL"
                           onChange={e => setEdited({...edited, avatar: e.target.value})}/>
                    <button onClick={handleUpdate}>💾 Lưu</button>
                    <button onClick={() => setIsEditing(false)}>❌ Hủy</button>
                </div>
            ) : (
                <>
                    <h3>{contact.firstName} {contact.lastName}</h3>
                    <p className="role">Chief Marketing Officer</p>
                    <p className="desc">I oversee the planning, development and execution of the company's marketing and
                        advertising initiatives.</p>
                    <p>📞 {contact.phone}</p>
                    <p>📧 {contact.email}</p>
                    <p>🌐 www.cloudtech.com</p>
                </>
            )}

            <style>{`
                .card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    position: relative;
                    text-align: center;
                }

                .card-header {
                    position: absolute;
                    right: 1rem;
                    top: 1rem;
                }

                .btn {
                    margin-left: 0.5rem;
                    padding: 0.3rem 0.6rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .edit {
                    background-color: #ffc107;
                }

                .delete {
                    background-color: #dc3545;
                    color: white;
                }

                .avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-top: 1rem;
                }

                .role {
                    color: #2ba2c4;
                    margin-top: 0.5rem;
                }

                .desc {
                    font-size: 0.9rem;
                    margin: 1rem 0;
                    color: #555;
                }

                .edit-form input {
                    width: 100%;
                    padding: 0.4rem;
                    margin: 0.4rem 0;
                    border-radius: 6px;
                    border: 1px solid #ccc;
                }
            `}</style>
        </div>
    );
};

export default ContactCard;
