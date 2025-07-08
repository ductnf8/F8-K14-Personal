import {useEffect, useState} from 'react';
import {
    getEmployees,
    deleteEmployee as apiDelete,
    updateEmployee as apiUpdate,
    addEmployee as apiAdd
} from '../api/employeeApi';

// Custom hook để quản lý danh sách nhân viên và các thao tác CRUD
export const useEmployees = () => {
    const [employees, setEmployees] = useState([]);     // Danh sách nhân viên
    const [loading, setLoading] = useState(true);       // Trạng thái đang tải dữ liệu
    const [error, setError] = useState(null);           // Trạng thái lỗi

    // Gọi API để lấy danh sách khi component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmployees();      // Gọi API lấy danh sách
                setEmployees(data);                     // Lưu vào state
            } catch (err) {
                setError('Failed to load employees.');
            } finally {
                setLoading(false);                      // Dừng trạng thái loading
            }
        };

        fetchData();
    }, []);

    // Hàm xóa nhân viên
    const deleteEmployee = async (id) => {
        const res = await apiDelete(id);
        if (res.success) {
            setEmployees(prev => prev.filter(emp => emp.id !== id));
        }
    };

    // Hàm cập nhật nhân viên
    const updateEmployee = async (updatedEmp) => {
        const res = await apiUpdate(updatedEmp);
        setEmployees(prev =>
            prev.map(emp => emp.id === res.id ? res : emp)
        );
    };

    // Hàm thêm mới nhân viên
    const addEmployee = async (newEmp) => {
        const res = await apiAdd(newEmp);
        setEmployees(prev => [...prev, res]);  // Thêm vào cuối danh sách
    };

    // Trả về các state và hàm để component dùng
    return {
        employees,
        loading,
        error,
        deleteEmployee,
        updateEmployee,
        addEmployee
    };
};
