import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProduct} from '../../store/product/productActions';
import {searchProductSelector} from '../SearchBox/searchSelector';
import {confirmAlert} from 'react-confirm-alert'; // ✅ import thư viện
import 'react-confirm-alert/src/react-confirm-alert.css'; // ✅ import CSS

const ProductTable = ({setEditingProduct, setIsOpen}) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const keyword = useSelector((state) => state.search.searchStr);

    const filteredProducts = searchProductSelector(products, keyword);

    const handleDelete = (id) => {
        confirmAlert({
            title: 'CONFIRM DELETE',
            message: 'Are you sure to delete this product?',
            buttons: [
                {
                    label: 'YES',
                    onClick: () => dispatch(deleteProduct(id)),
                },
                {
                    label: 'NO',
                    onClick: () => {
                    },
                },
            ],
        });
    };

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Đơn vị</th>
                <th>Hành động</th>
            </tr>
            </thead>
            <tbody>
            {filteredProducts.map((p) => (
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{p.unit}</td>
                    <td>
                        <button onClick={() => {
                            setEditingProduct(p);
                            setIsOpen(true);
                        }}>
                            EDIT
                        </button>
                        <button onClick={() => handleDelete(p.id)}>
                            DELETE
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
