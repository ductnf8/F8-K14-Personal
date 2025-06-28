import React, {useState} from 'react';
import {EditableTable} from './components'


const columns = [
    {name: 'product'},
    {name: 'quantity'},
    {name: 'price'},
    {name: 'amount'},
    {name: 'comment'},
]

const App = () => {

    const [rows, setRows] = useState([
        {
            product: 'product-1',
            quantity: 1,
            price: 1000,
            amount: 1000,
            comment: 'this is comment',
        },
        {
            product: 'product-2',
            quantity: 12,
            price: 10200,
            amount: 10300,
            comment: 'this is comment-2',
        }
    ])

    return (
        <div>
            <EditableTable columns={columns} rows={rows}/>
        </div>
    );
};

export default App;
