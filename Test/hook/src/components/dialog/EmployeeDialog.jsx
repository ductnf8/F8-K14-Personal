import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    TextField
} from '@mui/material';

const EmployeeDialog = ({
                            open,
                            onClose,
                            onSubmit,
                            formData,
                            onChange,
                            isEditing
                        }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{isEditing ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Họ"
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        label="Tên"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        label="Tuổi"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={onChange}
                        fullWidth
                        inputProps={{min: 0}}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Huỷ</Button>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    {isEditing ? 'Lưu' : 'Thêm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeDialog;
