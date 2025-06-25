import React, {useCallback, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CartItem from "./CartItem.jsx";

const Index = () => {
    const navigate = useNavigate()
    const onBack = () => {
        navigate('/')
    }
    const [cart, setCart] = useState([
        {id: 1, name: 'Áo thun', quantity: 1},
        {id: 2, name: 'Quần jeans', quantity: 2},
        {id: 3, name: 'Nón lưỡi trai', quantity: 1},
    ]);

    const onIncrease = useCallback((id) => {
        setCart(prev => prev.map(item => item.id === id
            ? {...item, quantity: item.quantity + 1}
            : item))
    }, [])

    const onDecrease = useCallback((id) => {
        setCart(prev => prev.map(item => item.id === id
            ? {...item, quantity: item.quantity - 1}
            : item))
    }, [])

    const onRemove = useCallback((id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }, [])

    return (
        <div>
            <div style={{maxWidth: 480, margin: '0 auto', padding: 20}}>
                <h2 style={{textAlign: 'center'}}>🛒 Giỏ hàng</h2>
                {cart.map(item => (
                    <CartItem key={item.id} item={item} onIncrease={onIncrease} onDecrease={onDecrease}
                              onRemove={onRemove}/>
                ))}
            </div>
            <button
                style={{
                    padding: '10px',
                    cursor: 'pointer',
                    background: 'green',
                    border: 'none',
                    borderRadius: '5px',
                    color: 'white'
                }}
                onClick={onBack}>Come
                Back
            </button>
        </div>
    );
};

export default Index;
