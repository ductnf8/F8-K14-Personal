import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const ProductList = () => {
    const dispatch = useDispatch()

    const products = useSelector(state => {
        return state.searchStr
            ? state.products.filter(p => p.name.includes(state.searchStr))
            : state.products
    })

    const onDelete = (id) => {
        dispatch({
            type: 'delete',
            value: id
        })
    }
    return (
        <>
            <ul>
                {
                    products.map(p => {
                        return (
                            <li key={p.id}>
                                <span>{p.name}</span>
                                <button onClick={() => onDelete(p.id)}>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
};

export default ProductList;
