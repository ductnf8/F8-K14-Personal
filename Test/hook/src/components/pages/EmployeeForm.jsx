import React from 'react';

// Form sử dụng để thêm hoặc chỉnh sửa nhân viên
const EmployeeForm = ({
                          isEditing = false,   // đang sửa hay đang thêm
                          data,
                          onChange,
                          onSubmit,
                          onCancel,
                          submitLabel = 'Lưu',
                      }) => {
    return (
        <>
            <td>{isEditing ? data.id : '#'}</td>
            <td>
                <input
                    name="lastName"
                    value={data.lastName}
                    onChange={onChange}
                />
            </td>
            <td>
                <input
                    name="firstName"
                    value={data.firstName}
                    onChange={onChange}
                />
            </td>
            <td>
                <input
                    name="email"
                    value={data.email}
                    onChange={onChange}
                />
            </td>
            <td>
                <input
                    name="age"
                    type="number"
                    value={data.age}
                    onChange={onChange}
                />
            </td>
            <td>
                <button onClick={onSubmit}>{submitLabel}</button>
                <button onClick={onCancel}>Huỷ</button>
            </td>
        </>
    );
};

export default EmployeeForm;
