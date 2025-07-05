import React, {useState} from 'react';
import SearchBox from './components/SearchBox';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';

const App = () => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container">
            <h1>Quản lý sản phẩm</h1>
            <SearchBox/>

            <button
                className="btn-add"
                onClick={() => {
                    setEditingProduct(null);
                    setIsOpen(true);
                }}
            >
                + Thêm sản phẩm
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
