import Head from 'next/head'
import ListProducts from '../../components/products/list-products'

export default function ProductsPage() {
  return (
    <div className='w-full'>
      <Head>
        <title>Simple Store</title>
        <meta name="description" content="Simple Store (e-commerce)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="products">
        <h1 className="text-xl font-bold mb-4">List of products</h1>
        <div className="list-products">
          <ListProducts />
        </div>
      </div>
    </div>
  )
}
