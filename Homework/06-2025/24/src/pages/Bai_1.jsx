import React, {useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";

const products = [
    {id: 1, name: 'Áo thun thể thao', price: 350000, category: 'Áo', brand: 'Nike'},
    {id: 2, name: 'Quần jogger', price: 750000, category: 'Quần', brand: 'Adidas'},
    {id: 3, name: 'Nón lưỡi trai', price: 250000, category: 'Phụ kiện', brand: 'Puma'},
    {id: 4, name: 'Áo hoodie', price: 1200000, category: 'Áo', brand: 'Nike'},
];

const isPriceValid = (priceFilter, price) => {
    return (
        priceFilter === 'All' ||
        (priceFilter === 'Under 500K' && price < 500000) ||
        (priceFilter === '500K - 1000k' && price >= 500000 && price <= 1000000) ||
        (priceFilter === 'Above 1000k' && price > 1000000)
    );
};

const Bai_1 = () => {

    const navigate = useNavigate()
    const onBack = () => {
        navigate('/')
    }
    const [priceFilter, setPriceFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');

    const filteredProducts = useMemo(() => {
        console.log('Danh sach san pham: ')

        return products.filter(p => {
            const priceValid = isPriceValid(priceFilter, p.price)
            const categoryValid = categoryFilter === 'All' || p.category === categoryFilter
            const brandValid = brandFilter === 'All' || p.brand === brandFilter

            return priceValid && categoryValid && brandValid
        })
    }, [priceFilter, categoryFilter, brandFilter])

    return (
        <div>
            <h2>Bai 1:</h2>
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                <div>
                    <label>Price</label>
                    <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                        <option>All</option>
                        <option>Under 500K</option>
                        <option>500K - 1000k</option>
                        <option>Above 1000k</option>
                    </select>
                </div>

                <div>
                    <label>Category</label>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option>All</option>
                        <option>Áo</option>
                        <option>Quần</option>
                        <option>Phụ kiện</option>
                    </select>
                </div>

                <div>
                    <label>Brand</label>
                    <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                        <option>All</option>
                        <option>Nike</option>
                        <option>Adidas</option>
                        <option>Puma</option>
                    </select>
                </div>
            </div>

            <ul>
                {
                    filteredProducts.length > 0
                        ? (
                            filteredProducts.map(p => (
                                <li key={p.id}>
                                    {p.name} - {p.price} VND - {p.category} - {p.brand}
                                </li>
                            ))
                        ) : (
                            <p>No matching products found</p>
                        )
                }
            </ul>

            <button style={{padding: '10px', cursor: 'pointer', background: 'aqua'}} onClick={onBack}>Come Back</button>
        </div>
    );
};

export default Bai_1;
