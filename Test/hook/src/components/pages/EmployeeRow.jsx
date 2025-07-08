import React from 'react';
import EmployeeCell from './EmployeeCell.jsx';

// Hiển thị 1 dòng nhân viên (không chỉnh sửa inline nữa)
const EmployeeRow = ({
                         employee,
                         onEdit,
                         onDelete
                     }) => {
    return (
        <tr>
            <td>{employee.id}</td>
            <EmployeeCell isEditing={false} value={employee.lastName}/>
            <EmployeeCell isEditing={false} value={employee.firstName}/>
            <EmployeeCell isEditing={false} value={employee.email}/>
            <EmployeeCell isEditing={false} value={employee.age}/>
            <td>
                <button onClick={() => onEdit(employee)}>Sửa</button>
                <button onClick={() => onDelete(employee.id)}>Xoá</button>
            </td>
        </tr>
    );
};

export default EmployeeRow;
