import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simple Store</title>
        <meta name="description" content="Simple Store (e-commerce)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">Simple Store</h1>
      <button className="btn">Test</button>
    </div>
  )
}
