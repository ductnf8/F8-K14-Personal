import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";

const EmployeeDialog = ({open, onClose, onSave, formData, onChange, isEditing}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle variant='h4' sx={{textAlign: 'center', bgcolor: '#1976d2', color: '#fff'}}>
                {
                    isEditing
                        ? 'EDIT EMPLOYEE'
                        : 'ADD EMPLOYEE'
                }
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} mt={3}>
                    <TextField
                        label='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={onChange}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={onChange}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='email'
                        name='email'
                        value={formData.email}
                        onChange={onChange}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='age'
                        name='age'
                        value={formData.age}
                        onChange={onChange}
                        variant='outlined'
                        fullWidth
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{px: 3, py: 2}}>
                <Button onClick={onClose} color="error" variant="text">
                    Cancel
                </Button>
                <Button onClick={onSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeDialog;
