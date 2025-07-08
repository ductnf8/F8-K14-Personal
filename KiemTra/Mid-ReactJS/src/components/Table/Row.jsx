import React from 'react';
import {Button, TableCell, TableRow} from "@mui/material";
import Cell from "./Cell.jsx";

const Row = ({product, onEdit, onDelete, categories}) => {
    const category = categories.find(cat => cat.id === product.categoryId)
    const categoryName = category ? category.name : 'Unknown'
    return (
        <TableRow>
            <Cell value={product.id}/>
            <Cell value={product.name}/>
            <Cell value={product.categoryId === '1' ? 'Clothes' : 'Phone'}/>
            <Cell value={product.orderNum}/>
            <TableCell>
                <Button sx={{mr: 2}} color='success' variant='outlined' onClick={onEdit}>EDIT</Button>
                <Button color='error' variant='outlined' onClick={onDelete}>DELETE</Button>
            </TableCell>
        </TableRow>
    );
};

export default Row;
