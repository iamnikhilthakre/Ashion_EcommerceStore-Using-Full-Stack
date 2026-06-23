import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function ProductList() {
    const API = `${import.meta.env.VITE_API_URL}/products`
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(API)
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching products:", error)
                setLoading(false)
            })
    }, [])

    if (loading) return <div className="text-center py-5"><h3>Loading products...</h3></div>

    return (
        <div className="row g-4">
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductList
