import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Post = () => {

    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/')
    }

    return (
        <div style={{padding: '20px'}}>
            <h1>Post</h1>
            <Button onClick={onLogout} variant='contained'>LOG OUT</Button>
        </div>
    );
};

export default Post;
