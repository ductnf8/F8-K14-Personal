'use client'

import {JSX, useState} from "react";

export default function Home(): JSX.Element {
    const [count, setCount] = useState<number>(0)

    const onIncrease = () => {
        setCount(prev => prev + 1)
    }
    const onDecrease = () => {
        setCount(prev => prev - 1)
    }
    const onReset = () => {
        setCount(0)
    }
    return (
        <>
            <h2>count: {count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <button onClick={onReset}>RESET</button>
        </>
    );
}
