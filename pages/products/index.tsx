import Head from 'next/head'

export default function ProductsPage() {
  return (
    <div>
      <Head>
        <title>Simple Store</title>
        <meta name="description" content="Simple Store (e-commerce)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">List of products</h1>
    </div>
  )
}
