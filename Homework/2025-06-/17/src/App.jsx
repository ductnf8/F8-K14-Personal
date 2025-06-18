import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FTable from "./components/FTable/index.jsx";
import {
    Button, Dialog, DialogContent, DialogTitle,
    TextField, DialogActions, Alert
} from "@mui/material";

const App = () => {
    const [rows, setRows] = useState([
        {id: 1, name: 'viet', age: 23, address: 'Hà Nội'},
        {id: 2, name: 'viet nam', age: 23, address: 'Sài Gòn'},
        {id: 3, name: 'viet', age: 23, address: 'Đà Nẵng'},
    ]);

    const columns = [
        {name: 'id', text: 'Id'},
        {name: 'name', text: 'Name'},
        {name: 'age', text: 'Age'},
        {name: 'address', text: 'Address'},
        {name: 'action', text: ''}
    ];

    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const [formData, setFormData] = useState({name: '', age: '', address: ''});

    const [editingId, setEditingId] = useState(null)

    const [error, setError] = useState('')

    const handleOpenAdd = () => {
        setFormData({name: '', age: '', address: ''})
        setEditingId(null);
        setError('');
        setIsOpenDialog(true);
    }

    const validateForm = (data) => {
        const name = data.name?.trim();
        const age = data.age;
        const address = data.address?.trim();

        if (!name || !age || !address) {
            setError('Please enter all fields!');
            return;
        }

        if (name.length < 2) {
            return 'Tên phải có ít nhất 2 ký tự!';
        }

        if (address.length < 5) {
            return 'Địa chỉ phải có ít nhất 5 ký tự!';
        }

        const parsedAge = parseInt(age);
        if (isNaN(parsedAge) || parsedAge <= 0) {
            return 'Tuổi phải là số nguyên dương hợp lệ!';
        }

        return null;
    };


    const handleSave = () => {
        // const {name, age, address} = formData;
        const errorMessage = validateForm(formData);
        if (errorMessage) {
            setError(errorMessage);
            toast.error(errorMessage)
            return;
        }
        const data = {
            name: formData.name.trim(),
            address: formData.address.trim(),
            age: parseInt(formData.age)
        };

        if (editingId !== null) {
            const updated = rows.map(r =>
                r.id === editingId ? {id: editingId, ...data} : r
            );
            setRows(updated);
            toast.success('Edit successfully!')
        } else {
            const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
            setRows([...rows, {id: newId, ...data}]);
            toast.success('Add successfully!')
        }

        setIsOpenDialog(false);
        setFormData({name: '', age: '', address: ''});
        setEditingId(null);
        setError('');
    };

    const handleEdit = (row) => {
        setFormData({
            name: row.name,
            age: row.age,
            address: row.address ?? ''
        });
        setEditingId(row.id);
        setError('');
        setIsOpenDialog(true);
    }

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure want to delete this employee?')
        if (!confirm) return
        const updateRows = rows.filter(r => r.id !== id)
        setRows(updateRows)
        toast.success('Delete successfully!')
    }

    return (
        <>
            <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
                <DialogTitle>{editingId !== null ? 'EDIT EMPLOYEE' : 'ADD NEW EMPLOYEE'}</DialogTitle>
                <DialogContent>
                    {/* Nếu có lỗi nhập thiếu → hiện cảnh báo */}
                    {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}

                    <TextField
                        label='Name'
                        fullWidth
                        variant='standard'
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <TextField
                        label='Age'
                        fullWidth
                        variant='standard'
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                    <TextField
                        label='Address'
                        fullWidth
                        variant='standard'
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpenDialog(false)}>CANCEL</Button>
                    <Button variant='contained' onClick={handleSave}>
                        {editingId !== null ? 'SAVE' : 'ADD'}
                    </Button>
                </DialogActions>
            </Dialog>


            <FTable columns={columns} rows={rows} onEdit={handleEdit} onDelete={handleDelete}/>

            {/* Nút Thêm mới */}
            <Button variant='outlined' sx={{mt: 2}} onClick={handleOpenAdd}>
                ADD NEW
            </Button>

            <ToastContainer position='top-right' autoClose={2000}/>
        </>
    );
};

export default App;
