import React, {useState} from 'react';
import ProductList from "./assets/components/ProductList.jsx";

const App = () => {

    const [products, setProducts] = useState([
        {id: 1, name: 'Áo thun', price: 100000},
        {id: 2, name: 'Quần jeans', price: 200000},
        {id: 3, name: 'Giày thể thao', price: 500000}
    ])


    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <ProductList products={products}/>
        </div>
    );
};

export default App;
