import React, {useReducer} from 'react';

const actionReducer = {
    'count/increase': (state) => ({...state, count: state.count + 1}),
    'count/decrement': (state) => ({...state, count: state.count - 1}),
    'name/change': (state, action) => ({...state, name: action.payload})
}

const reducer = (state, action) => {
    const handle = actionReducer[action.type]
    return handle ? handle(state, action) : state

}

const App = () => {

    const [state, dispatch] = useReducer(reducer, {count: 0, name: ''})

    const onIncrease = () => {
        dispatch({type: 'count/increase'})
    }

    const onChange = (e) => {
        dispatch({type: 'name/change', payload: e.target.value})
    }

    return (
        <div>
            <h1>Giá trị: {state.count}</h1>
            <button onClick={onIncrease}>+</button>
            <button onClick={() => dispatch({type: "decrement"})}>-</button>
            <input type="text" value={state.name || ''} onChange={onChange}/>
        </div>
    );
};

export default App;
