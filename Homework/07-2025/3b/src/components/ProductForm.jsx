import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addProduct, updateProduct} from '../store/actions';

const ProductForm = ({product, onClose}) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        price: '',
        quantity: '',
        unit: '',
    });

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
        if (!product) {
            setForm({name: '', price: '', quantity: '', unit: ''});
        }
    };

    return (
        <div className="popup">
            <form onSubmit={onSubmit}>
                <h3>{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
                <input
                    name="name"
                    type="text"
                    placeholder="Tên"
                    value={form.name}
                    onChange={onChange}
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Giá"
                    value={form.price}
                    onChange={onChange}
                    required
                />
                <input
                    name="quantity"
                    type="number"
                    placeholder="Số lượng"
                    value={form.quantity}
                    onChange={onChange}
                    required
                />
                <input
                    name="unit"
                    type="text"
                    placeholder="Đơn vị"
                    value={form.unit}
                    onChange={onChange}
                    required
                />
                <button type="submit">Lưu</button>
                <button type="button" onClick={onClose}>
                    Đóng
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
