import React, {useState} from 'react';
import {Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import ProductDialog from "../Dialog/ProductDialog.jsx";
import {useProducts} from "../hooks/useProducts.js";
import Row from "./Row.jsx";

const ProductTable = () => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({name: '', category: '', orderNum: ''})
    const [isEditing, setIsEditing] = useState(false)

    const {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories
    } = useProducts()

    const onChange = (e) => {
        console.log('vao day')
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const setOpenDialog = () => {
        setFormData({name: '', category: '', orderNum: ''})
        setOpen(true)
    }
    const onCloseDialog = () => setOpen(false)

    const onSave = async () => {
        if (isEditing) {
            await updateProduct(formData)
        } else {
            await addProduct(formData)
        }
        setOpen(false)
    }

    const onEdit = (product) => {
        setIsEditing(true)
        setFormData(product)
        setOpen(true)
    }

    const onDelete = async (id) => {
        await deleteProduct(id)
    }
    return (
        <Container>
            <Typography variant='h5'>LIST PRODUCTS</Typography>
            <Button variant='contained' onClick={setOpenDialog}>ADD PRODUCT</Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Numerical order</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products.map(p => (
                            <Row
                                key={p.id}
                                onEdit={() => onEdit(p)}
                                onDelete={() => onDelete(p.id)}
                                product={p}
                                categories={categories}
                            />
                        ))
                    }
                </TableBody>
            </Table>

            <ProductDialog
                onChange={onChange}
                isEditing={isEditing}
                onClose={onCloseDialog}
                onSave={onSave}
                formData={formData}
                open={open}
            />
        </Container>

    );
};

export default ProductTable;
