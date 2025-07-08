import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteContact, updateContact} from '../store/contactSlice';

const ContactCard = ({contact}) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState({...contact});

    const handleUpdate = () => {
        if (!edited.firstName || !edited.lastName || !edited.email || !edited.phone || !edited.avatar) {
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
        <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '8px'}}>
            <img src={contact.avatar} alt='avatar' width={100} height={100} style={{borderRadius: '50%'}}/>
            {isEditing ? (
                <>
                    <input value={edited.firstName} onChange={e => setEdited({...edited, firstName: e.target.value})}/>
                    <input value={edited.lastName} onChange={e => setEdited({...edited, lastName: e.target.value})}/>
                    <input value={edited.email} onChange={e => setEdited({...edited, email: e.target.value})}/>
                    <input value={edited.phone} onChange={e => setEdited({...edited, phone: e.target.value})}/>
                    <input value={edited.avatar} onChange={e => setEdited({...edited, avatar: e.target.value})}/>
                    <button onClick={handleUpdate}>💾 Lưu</button>
                    <button onClick={() => setIsEditing(false)}>❌ Hủy</button>
                </>
            ) : (
                <>
                    <h3>{contact.firstName} {contact.lastName}</h3>
                    <p>📧 {contact.email}</p>
                    <p>📞 {contact.phone}</p>
                    <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
                    <button onClick={handleDelete}>🗑 Delete</button>
                </>
            )}
            <style>{`
                input {
                    display: block;
                    margin-bottom: 0.5rem;
                    padding: 0.3rem;
                    width: 100%;
                }

                button {
                    margin-right: 0.5rem;
                    margin-top: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default ContactCard;
