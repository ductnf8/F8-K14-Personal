'use client'

import {useEffect, useState} from "react";
import axios from "axios";

interface ProductI {
    id: number
    title: string
}

export default function Home() {
    // const [products, setProducts] = useState([])
    const products: ProductI[] = data
    const getProducts = async () => {
        try {
            const {data} = await axios.get('https://fakestoreapi.com/products')
            setProducts(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <h1>Product List</h1>
            <ul>
                {
                    products.map(p => {
                        return <li key={p.id}>{p.title}</li>
                    })
                }
            </ul>
        </>
    )
}