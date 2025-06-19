import React from 'react';

const PostItem = ({post}) => {
    return (
        <div style={{marginBottom: '20px'}}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
};

export default PostItem;
