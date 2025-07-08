import React from 'react';

// Component đại diện cho 1 ô trong bảng (có thể là input hoặc text)
const EmployeeCell = ({isEditing, name, value, onChange}) => {
    return (
        <td>
            {isEditing ? (
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={name === 'age' ? 'number' : 'text'}
                />
            ) : (
                value
            )}
        </td>
    );
};

export default EmployeeCell;
