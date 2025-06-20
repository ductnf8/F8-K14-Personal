import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export default function EDialog({open, onClose, onSave, formData, setFormData, editingId, error}) {

    const handleChange = (field) => (e) => {
        setFormData(prev => (
            {
                ...prev,
                [field]: e.target.value
            }
        ))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {editingId !== null
                    ? 'EDIT EMPLOYEE'
                    : 'ADD NEW EMPLOYEE'
                }
            </DialogTitle>

            <DialogContent>
                {
                    error && (
                        <Alert severity='error' sx={{mb: 2}}>
                            {error}
                        </Alert>
                    )
                }

                <TextField
                    label='Name'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={formData.name}
                    onChange={handleChange('name')}
                ></TextField>
                <TextField
                    label='Age'
                    type='number'
                    fullWidth
                    variant='standard'
                    value={formData.age}
                    onChange={handleChange('age')}
                ></TextField>
                <TextField
                    label='Address'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={formData.address}
                    onChange={handleChange('address')}
                ></TextField>
            </DialogContent>

            <DialogActions>
                <Button color='error' onClick={onClose}>CANCEL</Button>
                <Button onClick={onSave} variant='contained'>
                    {
                        editingId !== null ? 'SAVE' : 'ADD'
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}