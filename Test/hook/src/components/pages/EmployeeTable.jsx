import React, {useState} from 'react';
import {useEmployees} from '../../hooks/useEmployees.js';
import {toast} from 'react-toastify';
import EmployeeRow from './EmployeeRow.jsx';
import EmployeeDialog from '../dialog/EmployeeDialog.jsx';

const initialForm = {firstName: '', lastName: '', email: '', age: ''};

const EmployeeTable = () => {
    const {
        employees,
        loading,
        error,
        deleteEmployee,
        updateEmployee,
        addEmployee
    } = useEmployees();

    const [dialogOpen, setDialogOpen] = useState(false);   // Trạng thái mở popup
    const [isEditing, setIsEditing] = useState(false);     // Là sửa hay thêm
    const [formData, setFormData] = useState(initialForm); // Dữ liệu form

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleEdit = (emp) => {
        setIsEditing(true);
        setFormData(emp);
        setDialogOpen(true);
    };

    const handleOpenAdd = () => {
        setIsEditing(false);
        setFormData(initialForm);
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (!formData.firstName || !formData.email || formData.age <= 0) {
            toast.error("Vui lòng nhập đầy đủ thông tin hợp lệ!");
            return;
        }

        if (isEditing) {
            await updateEmployee(formData);
            toast.success("Cập nhật thành công!");
        } else {
            await addEmployee(formData);
            toast.success("Thêm mới thành công!");
        }

        setDialogOpen(false);
        setFormData(initialForm);
    };

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        toast.success("Xoá thành công!");
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{padding: 20}}>
            <h2>Danh sách nhân viên</h2>
            <table border="1" cellPadding="8" width="100%">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Họ</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Tuổi</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {employees.map(emp => (
                    <EmployeeRow
                        key={emp.id}
                        employee={emp}
                        isEditing={false} // vì giờ edit dùng popup
                        formData={{}}
                        onChange={() => {
                        }}
                        onEdit={handleEdit}
                        onSave={() => {
                        }}
                        onCancel={() => {
                        }}
                        onDelete={handleDelete}
                    />
                ))}
                </tbody>
            </table>

            <button style={{marginTop: 10}} onClick={handleOpenAdd}>
                ➕ Thêm nhân viên
            </button>

            {/* Dialog form thêm/sửa */}
            <EmployeeDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                isEditing={isEditing}
            />
        </div>
    );
};

export default EmployeeTable;
