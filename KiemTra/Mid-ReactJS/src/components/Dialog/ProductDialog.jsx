import React, {useEffect, useState} from 'react';
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";

const ProductDialog = ({open, onClose, formData, onChange, onSave, isEditing}) => {
    const [formDataNew, setFormDataNew] = useState({
        name: '',
        categoryId: null,
        orderNum: ''
    })

    const [categories, setCategories] = useState([]);
    const getData = async () => {
        const {data} = await api.get("categories");
        console.log(data);
        setCategories(data);
        return data;
    };

    const selectedCategory = categories.find((cat) => cat.id === formData.categoryId) || null
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.getCategories()
                setCategories(res.data)
            } catch (e) {
                console.log(e.message)
            }
        }
        getData();
    }, []);

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle>
                {
                    isEditing
                        ? 'EDIT PRODUCT'
                        : 'ADD PRODUCT'
                }
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3} mt={3}>
                    <TextField
                        label='Product Name'
                        onChange={onChange}
                        value={formData.name}
                        fullWidth
                        variant='outlined'
                        required
                    />
                    <Autocomplete
                        disablePortal
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        getOptionKey={(option) => option.id}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Product"/>}
                    />

                    <TextField
                        label='Numerical Order'
                        onChange={onChange}
                        value={formData.orderNum}
                        fullWidth
                        variant='outlined'
                        required
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={onClose}>CANCEL</Button>
                <Button variant='contained' onClick={onSave}>SAVE</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
