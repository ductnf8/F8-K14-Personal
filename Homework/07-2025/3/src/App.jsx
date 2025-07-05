import React, {useState} from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import ProductTable from './components/ProductList/ProductTable';
import ProductForm from './components/ProductList/ProductForm';
import './App.css';

const App = () => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container">
            <h1>LIST PRODUCTS</h1>
            <SearchBox/>

            <button
                className="btn-add"
                onClick={() => {
                    setEditingProduct(null);
                    setIsOpen(true);
                }}
            >
                + ADD PRODUCT
            </button>

            <ProductTable
                setEditingProduct={setEditingProduct}
                setIsOpen={setIsOpen}
            />

            {isOpen && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default App;
