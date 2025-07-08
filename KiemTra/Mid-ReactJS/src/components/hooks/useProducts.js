import {useEffect, useState} from "react";
import {addPro, deletePro, getProducts, updatePro, getCate} from "../utils/api.js"; // ✅ Thêm getCate

const generateIncrementalId = (products) => {
    if (products.length === 0) return 1
    const maxId = Math.max(...products.map(e => e.id || 0))
    return maxId + 1
}

export const useProducts = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchData()
        fetchCategories()
    }, []);

    const fetchData = async () => {
        try {
            const data = await getProducts()
            setProducts(data)
            console.log(data, "data")
        } catch (e) {
            console.log(e.message)
        }
    }

    const fetchCategories = async () => {
        try {
            const data = await getCate()
            setCategories(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    const addProduct = async (product) => {
        try {
            const newProduct = await addPro(product)
            newProduct.id = generateIncrementalId(products)
            setProducts(prev => [...prev, newProduct])
        } catch (e) {
            console.log(e.message)
        }
    }

    const updateProduct = async (product) => {
        try {
            const updated = await updatePro(product)
            setProducts(prev => prev.map(p => p.id === product.id ? updated : p))
        } catch (e) {
            console.log(e.message)
        }
    }

    const deleteProduct = async (id) => {
        try {
            await deletePro(id)
            setProducts(prev => prev.filter(p => p.id !== id))
        } catch (e) {
            console.log(e.message)
        }
    }

    return {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories
    }
}
