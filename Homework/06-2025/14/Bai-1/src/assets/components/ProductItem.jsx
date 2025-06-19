import React from 'react';

const ProductItem = ({product}) => {
    return (
        <div style={{marginTop: '30px'}}>
            <p>{product.name}</p>
            <p>Gias: {product.price} VND</p>
        </div>
    );
};

export default ProductItem;
