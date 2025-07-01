import {EditableTable} from './components'
import './App.css'
import {useState} from "react";

const columns = [
    {name: 'product', width: '30%'},
    {name: 'quantity', width: '20%'},
    {name: 'price', width: '10%'},
    {name: 'amount', width: '10%'},
    {name: 'comment', width: '30%'},
]

function App() {
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

    const onInput = ({rowIndex, columnIndex, value}) => {
        const newData = [...rows]
        newData[rowIndex][columns[columnIndex]] = value
        setRows(newData)
    }

    return (
        <>
            <EditableTable columns={columns} rows={rows} onInput={onInput}/>
        </>
    )
}

export default App