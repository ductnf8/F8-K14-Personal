import React, {useState} from 'react';
import {FTable} from "./components/index.js";
import Dialog from "./components/EDialog/index.jsx";
import {Box, Button} from "@mui/material";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [formData, setFormData] = useState({name: '', age: '', address: ''})
    const [editingId, setEditingId] = useState(null)
    const [error, setError] = useState('')

    const handleOpenAdd = () => {
        setFormData({name: '', age: '', address: ''})
        setEditingId(null)
        setError('')
        setIsOpenDialog(true)
    }

    const handleSave = () => {
        const data = {
            name: formData.name,
            age: parseInt(formData.age),
            address: formData.address
        }

        // hanh dong edit
        if (editingId !== null) {
            const updateRows = rows.map(r => r.id === editingId ? {id: editingId, ...data} : r)
            setRows(updateRows)
            toast.success('Edit Successfully!')
        } else {
            const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1
            setRows([...rows, {id: newId, ...data}])
            toast.success('Add Successfully!')
        }

        setIsOpenDialog(false)
        setFormData({name: '', age: '', address: ''});
        setEditingId(null);
        setError('');
    }

    const handleEdit = (row) => {
        setFormData({
            name: row.name,
            age: row.age,
            address: row.address
        })
        setEditingId(row.id)
        setError('')
        setIsOpenDialog(true)
    }

    const handleDelete = (id) => {
        const updateRows = rows.filter(r => r.id !== id)
        setRows(updateRows)
        toast.success('Delete Successfully!')
    }


    return (
        <>
            <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)} error={error} editingId={editingId}
                    formData={formData} setFormData={setFormData} onSave={handleSave}/>
            <FTable columns={columns} rows={rows} onEdit={handleEdit} onDelete={handleDelete}/>

            <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                <Button variant='outlined'
                        onClick={handleOpenAdd}
                >ADD NEW</Button>
            </Box>

            <ToastContainer position='top-right' autoClose={2000}/>
        </>
    );
};

export default App;
