import Head from "next/head"
import Link from "next/link"
import { useEffect } from "react"
import useCheckout from "../../components/checkout/useCheckout"

export default function ThanksPage() {
    const { cleanShoppingCart } = useCheckout()
    
    useEffect(() => {
        cleanShoppingCart()
    }, []) 
    
    return (
        <div className="hero">
            <Head>
                <title>Thanks for buy! - Simple Store</title>
                <meta name="description" content="Simple Store (e-commerce)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Thanks for Buy</h1>
                    <p className="py-6">Now your shopping cart is empty, why not fill it again?</p>
                    <Link href='/products' className="btn btn-primary">Go to Products</Link>
                </div>
            </div>
        </div>
    )
}