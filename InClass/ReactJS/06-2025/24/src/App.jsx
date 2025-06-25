import React, {memo, useEffect, useMemo, useState} from 'react';

const Com1 = memo(() => {
    console.log('component 1')
    return (
        <h1>Component 1</h1>
    )
})

const Com2 = memo(({count}) => {
    console.log('component 2')
    console.log(count)
    return (
        <>
            <h2>Component 2</h2>
            <p>{count}</p>
        </>
    )
})

const getSum = () => {
    let val = 0
    for (let i = 0; i < 10; i++) {
        val += i
    }
    return val
}

const App = () => {
    const [count, setCount] = useState(0)
    const [age, setAge] = useState(0)
    const [input, setInput] = useState('')

    useEffect(() => {
        setCount(count + 1)
    }, []);

    // const sum = useMemo(() => getSum(count), [count])

    return (
        <div>
            <Com1/>
            <Com2 count={count}/>
            {/*<p>sum:{sum}</p>*/}
            <p>age:{age}</p>
            {/*<button onClick={() => setCount(count + 1)}>count</button>*/}
            <button onClick={() => setAge(age + 1)}>age</button>
        </div>
    );
};

export default App;
