import React, {useState} from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import EmployeeRow from "./EmployeeRow.jsx";
import EmployeeDialog from "../Dialog/EmployeeDialog.jsx";
import {useEmployees} from '../../hook/useEmployees.js'

const EmployeeTable = () => {

    const {
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee
    } = useEmployees()

    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', age: ''})
    const [isEditing, setIsEditing] = useState(false)

    const onOpenDialog = () => {
        console.log('onOpenDialog')
        setFormData({firstName: '', lastName: '', email: '', age: ''})
        setOpen(true)
    }

    const onCloseDialog = () => setOpen(false)

    const onChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSave = async () => {
        if (isEditing) {
            await updateEmployee(formData)
        } else {
            await addEmployee(formData)
        }
        setOpen(false)
    }
    const onEdit = (employee) => {
        setFormData(employee)
        setIsEditing(true)
        setOpen(true)
    }

    const onDelete = async (id) => {
        await deleteEmployee(id)
    }

    return (
        <>
            <Typography variant='h4' gutterBottom>MANAGE EMPLOYEE</Typography>
            <Button variant='contained' onClick={onOpenDialog}>
                ADD EMPLOYEE
            </Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        employees.map(e => (
                            <EmployeeRow
                                key={e.id}
                                employee={e}
                                onEdit={() => onEdit(e)}
                                onDelete={() => onDelete(e.id)}
                            />
                        ))
                    }
                </TableBody>
            </Table>

            <EmployeeDialog
                open={open}
                onClose={onCloseDialog}
                onSave={onSave}
                formData={formData}
                onChange={onChange}
                isEditing={isEditing}
            />
        </>
    );
};

export default EmployeeTable;
