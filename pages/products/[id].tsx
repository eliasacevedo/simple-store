interface StaticProps{
    params: any
}

interface ProductProps{
    id: any
}

export default function Product({id}: ProductProps) {
  return (
    <>
        <p>Product {id}</p>
    </>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  return { 
    paths: [
        {
            params: {
                id: '1'
            }
        },
        {
            params: {
                id: '2'
            }
        },
    ], 
    fallback: false }
}

export async function getStaticProps({ params }: StaticProps) {
  // Fetch necessary data for the blog post using params.id
    return {
        props: {
            id: params.id
        }
    }
}