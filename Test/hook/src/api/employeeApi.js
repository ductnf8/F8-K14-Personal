import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/users';

// 📌 Gọi API thật để lấy danh sách nhân viên
export const getEmployees = async () => {
    try {
        const response = await axios.get(BASE_URL);
        const data = response.data;

        return data.users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age
        }));
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhân viên:', error);
        return [];
    }
};

// 📌 Gọi API thật để thêm nhân viên mới
export const addEmployee = async (employee) => {
    try {
        const response = await axios.post(BASE_URL, employee);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm nhân viên:', error);
        throw error;
    }
};

// 📌 Gọi API thật để cập nhật nhân viên
export const updateEmployee = async (employee) => {
    try {
        const response = await axios.put(`${BASE_URL}/${employee.id}`, employee);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật nhân viên:', error);
        throw error;
    }
};

// 📌 Gọi API thật để xoá nhân viên
export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xoá nhân viên:', error);
        throw error;
    }
};
