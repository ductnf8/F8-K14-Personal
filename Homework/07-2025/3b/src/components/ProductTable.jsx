import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProduct} from '../store/actions';
import {selectFilteredProducts} from '../store/selectors';

const ProductTable = ({setEditingProduct, setIsOpen}) => {
    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilteredProducts);

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
                        <button
                            onClick={() => {
                                setEditingProduct(p);
                                setIsOpen(true);
                            }}
                        >
                            Sửa
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
                                    dispatch(deleteProduct(p.id));
                                }
                            }}
                        >
                            Xoá
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
