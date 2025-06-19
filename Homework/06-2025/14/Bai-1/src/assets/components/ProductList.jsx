import React from 'react';
import ProductItem from "./ProductItem.jsx";

const ProductList = ({products}) => {
    return (
        <div>
            {
                products.map(product => (
                    <ProductItem key={product.id} product={product}/>
                ))
            }
        </div>
    );
};

export default ProductList;
