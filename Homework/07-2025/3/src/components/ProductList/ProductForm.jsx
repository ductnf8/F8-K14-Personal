import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addProduct, updateProduct} from '../../store/product/productActions';

const ProductForm = ({product, onClose}) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({name: '', price: '', quantity: '', unit: ''});

    useEffect(() => {
        if (product) setForm(product);
    }, [product]);

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (product) dispatch(updateProduct(form));
        else dispatch(addProduct(form));
        onClose();
    };

    return (
        <div className="popup">
            <form onSubmit={onSubmit}>
                <h3>{product ? 'EDIT PRODUCT' : 'ADD PRODUCT'}</h3>
                <input name="name" type="text" value={form.name} onChange={onChange} placeholder="Name" required/>
                <input name="price" type="number" value={form.price} onChange={onChange} placeholder="Price" required/>
                <input name="quantity" type="number" value={form.quantity} onChange={onChange} placeholder="Quantity"
                       required/>
                <input name="unit" type="text" value={form.unit} onChange={onChange} placeholder="Unit" required/>
                <button type="submit">SAVE</button>
                <button type="button" onClick={onClose}>CLOSE</button>
            </form>
        </div>
    );
};

export default ProductForm;
