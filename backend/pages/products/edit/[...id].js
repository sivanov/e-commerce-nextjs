import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
 
export default function EditProductPage() {
    const router = useRouter()
    // this is taken from file: '/api/product/edit[...id].js'
    const { id } = router.query
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/api/products?id=' + id)
            .then(res => {
                setProductInfo(res.data)
            })
    }, [id])

    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    )
}