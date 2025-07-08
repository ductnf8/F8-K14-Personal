import React, {useState} from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useContacts} from "../hook/useContacts.js";
import ContactRow from "./ContactRow.jsx";
import ContactDialog from "../Dialog/ContactDialog.jsx";

const ContactTable = () => {
    const {
        contacts,
        addContact,
        updateContact,
        deleteContact
    } = useContacts()
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', phone: ''})
    const [isEditing, setIsEditing] = useState(false)

    const onOpenDialog = () => {
        setFormData({firstName: '', lastName: '', email: '', phone: ''})
        setOpen(true)
    }

    const onEdit = (contact) => {
        setFormData(contact)
        setIsEditing(true)
        setOpen(true)
    }

    const onDelete = async (id) => {
        await deleteContact(id)
    }

    const onCloseDialog = () => setOpen(false)

    const onSave = async () => {
        if (isEditing) {
            await updateContact(formData)
        } else {
            await addContact(formData)
        }
        setOpen(false)
    }

    const onChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <>
            <Typography variant='h3'>MANAGE CONTACT</Typography>
            <Button variant='contained' onClick={onOpenDialog}>ADD CONTACT</Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        contacts.map(c => (
                            <ContactRow
                                key={c.id}
                                contact={c}
                                onEdit={() => onEdit(c)}
                                onDelete={() => onDelete(c.id)}
                            />
                        ))
                    }
                </TableBody>
            </Table>

            <ContactDialog
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

export default ContactTable;
