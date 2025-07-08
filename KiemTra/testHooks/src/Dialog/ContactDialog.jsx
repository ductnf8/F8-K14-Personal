import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";

const ContactDialog = ({open, formData, onClose, onChange, onSave, isEditing}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {
                    isEditing
                        ? 'EDIT EMPLOYEE'
                        : 'ADD EMPLOYEE'
                }
            </DialogTitle>
            <DialogContent>
                <TextField
                    label='first name'
                    name='firstName'
                    onChange={onChange}
                    value={formData.firstName}
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='last name'
                    name='lastName'
                    onChange={onChange}
                    value={formData.lastName}
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='email'
                    name='email'
                    onChange={onChange}
                    value={formData.email}
                    variant='outlined'
                    fullWidth
                />
                <TextField
                    label='phone'
                    name='phone'
                    onChange={onChange}
                    value={formData.phone}
                    variant='outlined'
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{px: 3, py: 2}}>
                <Button color='error' onClick={onClose}>CANCEL</Button>
                <Button variant='contained' onClick={onSave}>SAVE</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContactDialog;
