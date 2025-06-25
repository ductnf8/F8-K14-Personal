import React, {memo} from 'react';

const CartItem = memo(({item, onIncrease, onDecrease, onRemove}) => {
    console.log('Rendering', item.name)

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            border: '1px solid #ddd',
            borderRadius: 6,
            marginBottom: 12
        }}>
            <div>
                <div style={{fontWeight: 'bold'}}>{item.name}</div>
                <div style={{fontSize: 13, color: '#666'}}>Số lượng: {item.quantity}</div>
            </div>

            <div style={{display: 'flex', gap: 6}}>
                <button onClick={() => onIncrease(item.id)}>+</button>
                <button onClick={() => onDecrease(item.id)} disabled={item.quantity <= 1}>-</button>
                <button onClick={() => onRemove(item.id)} style={{color: 'red'}}>Xóa</button>
            </div>
        </div>
    )
})


export default CartItem;
