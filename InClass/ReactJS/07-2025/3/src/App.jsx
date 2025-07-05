import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {v7} from 'uuid'
import ProductList from "./components/ProductList/index.jsx";
import Search from "./components/Search/index.jsx";

const App = () => {
    const dispatch = useDispatch()
    const count = useSelector(state => state.count)

    const onAddNew = () => {
        const id = v7()
        dispatch({
            type: 'addNew',
            value: {
                id, name: `Product ${id}`
            }
        })
    }

    return (
        <div>
            <h1>count:{count}</h1>
            <button
                onClick={() => dispatch({type: 'count'})}
            >
                +
            </button>

            <button onClick={onAddNew}>ADD NEW BUTTON</button>
            <Search/>
            <ProductList/>
        </div>
    );
};

export default App;
