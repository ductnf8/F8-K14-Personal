import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const users = [
    {id: 1, name: 'Nguyễn Văn A'},
    {id: 2, name: 'Trần Thị B'},
    {id: 3, name: 'Lê Văn C'},
];

const UserItem = React.memo(({user}) => {
    console.log('Render again:', user.name);

    return (
        <li>
            {user.name}
        </li>
    );
});

const Bai_2 = () => {
    const navigate = useNavigate()
    const onBack = () => {
        navigate('/')
    }
    const [score, setScore] = useState(0);

    return (
        <div style={{padding: '1rem'}}>
            <button
                onClick={() => setScore(prev => prev + 1)}
                style={{
                    padding: '8px 16px',
                    marginBottom: '1rem',
                    fontSize: '16px',
                }}
            >
                Increase score: {score}
            </button>

            <h3>USER LIST:</h3>
            <ul>
                {users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </ul>
            <button
                style={{
                    padding: '10px',
                    cursor: 'pointer',
                    background: 'green',
                    border: 'none',
                    borderRadius: '5px',
                    color: 'white'
                }}
                onClick={onBack}>Come
                Back
            </button>
        </div>
    );
};

export default Bai_2;
