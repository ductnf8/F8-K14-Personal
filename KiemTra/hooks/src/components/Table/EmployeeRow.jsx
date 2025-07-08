import React from 'react';
import EmployeeCell from "./EmployeeCell.jsx";
import {Button, TableCell, TableRow} from "@mui/material";

const EmployeeRow = ({employee, onEdit, onDelete}) => {
    return (
        <TableRow>
            <EmployeeCell value={employee.id}/>
            <EmployeeCell value={employee.lastName}/>
            <EmployeeCell value={employee.firstName}/>
            <EmployeeCell value={employee.email}/>
            <EmployeeCell value={employee.age}/>
            <TableCell>
                <Button sx={{mr: 2}} color='error' variant='outlined' onClick={() => onEdit(employee)}>EDIT</Button>
                <Button variant='contained' onClick={() => onDelete(employee.id)}>DELETE</Button>
            </TableCell>
        </TableRow>
    );
};

export default EmployeeRow;
