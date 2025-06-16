import React from 'react';

const StudentItem = ({student}) => {
    return (
        <div>
            {
                Object.entries(student).map(([key, value]) => {
                    if (key === 'id') return null
                    return (
                        <p key={key}>
                            {
                                key === 'name' ? `${value}` : `${key} : ${value}`
                            }
                        </p>
                    )
                })
            }
        </div>
    );
};

export default StudentItem;
