import Head from "next/head"
import ProductDetails from "../../components/products/product-details"
import useProducts from "../../components/products/useProducts"

interface StaticProps{
    params: any
}

interface ProductProps{
    id: any
}

export default function Product({id}: ProductProps) {
    const { productQuery } = useProducts(id)
    const { data, isLoading } = productQuery
    const product = data?.data
  return (
    <>
        <Head>
            <title>Products - Simple Store</title>
            <meta name="description" content="Simple Store (e-commerce)" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {
            isLoading ? 
            (<progress className="progress w-100"></progress>) : 
            product ? <ProductDetails {...product} /> : <></>
        }
    </> 
  )
}

export async function getStaticPaths() {
    return { 
        paths: [], 
        fallback: true 
    }
}

export async function getStaticProps({ params }: StaticProps) {
    return {
        props: {
            id: params.id
        }
    }
}