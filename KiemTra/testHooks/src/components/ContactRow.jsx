import React from 'react';
import {Button, TableCell, TableRow} from "@mui/material";
import Cell from "./Cell.jsx";

const ContactRow = ({contact, onEdit, onDelete}) => {
    return (
        <TableRow>
            <Cell value={contact.id}/>
            <Cell value={contact.firstName}/>
            <Cell value={contact.lastName}/>
            <Cell value={contact.email}/>
            <Cell value={contact.phone}/>
            <TableCell>
                <Button sx={{mr: 2}} color='error' variant='outlined' onClick={() => onEdit(contact)}>EDIT</Button>
                <Button variant='contained' onClick={() => onDelete(contact.id)}>DELETE</Button>
            </TableCell>
        </TableRow>
    );
};

export default ContactRow;
