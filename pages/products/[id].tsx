import useProducts from "../../components/products/useProducts"

interface StaticProps{
    params: any
}

interface ProductProps{
    id: any
}

export default function Product({id}: ProductProps) {
    const { productQuery } = useProducts(id)
    const { data, error, status } = productQuery
  return (
    <>
        <p>Product {id}</p>
        {data?.data.name}
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
  // Fetch necessary data for the blog post using params.id
    return {
        props: {
            id: params.id
        }
    }
}