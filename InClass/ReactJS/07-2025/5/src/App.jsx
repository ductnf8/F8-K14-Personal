import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addNew, increase} from "./store/index.js";

const App = () => {

    const dispatch = useDispatch()
    const count = useSelector(state => state.count)
    const products = useSelector(state => state.products)

    const onClick = () => {
        dispatch(increase(2))
    }
    const onAdd = () => {
        dispatch(addNew({
            id: 1,
            name: 'test'
        }))
    }

    const onDelete = () => {

    }
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={onClick}>+</button>
            <button onClick={onAdd}>+</button>

            <ul>
                {
                    products.map(p => {
                        return (
                            <li key={p.id}>
                                <span>{p.name}</span>
                                <button onClick={() => onDelete(p.id)}>del</button>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    );
};

export default App;
