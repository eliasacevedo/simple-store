import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import Head from "next/head"
import CheckoutItemComponent from "../../components/checkout/checkout-item"
import useCheckout from "../../components/checkout/useCheckout"
import useOrders from "../../components/orders/useOrders"

export default function CheckoutPage() {
    
    const { checkoutItemsQuery, totalPaymentQuery } = useCheckout()
    const { createPayPalOrder, onApprove, options, fundingSource } = useOrders(totalPaymentQuery.data?.data)
    
    return (
        <div className="w-full">
             <Head>
                <title>Checkout - Simple Store</title>
                <meta name="description" content="Simple Store (e-commerce)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="header">
                <h2 className="text-xl font-bold mb-4">Shopping cart items</h2>
            </div>
            <main className="content md:flex">
                <div className="products-list w-full md:w-4/5 flex flex-wrap">
                {
                    checkoutItemsQuery.isLoading ? <progress className="progress w-4/5"></progress> : ''
                }
                {
                    checkoutItemsQuery.data?.data.map(product => (
                        <div key={product.product.id} className="mr-4 h-52 mb-4 w-full md:w-96">
                            <CheckoutItemComponent  {...product}/>
                        </div>
                    ))
                }
                </div>
                <div className="summary w-full md:w-1/5">
                    <h3 className="summary-text">Total Invoice: ${totalPaymentQuery.data?.data.toFixed(2)}</h3>
                    <PayPalScriptProvider
                        options={options}
                    >
                        <PayPalButtons
                            style={{
                                color: 'blue',
                                shape: 'rect',
                                label: 'pay',
                                height: 30,
                            }}
                            fundingSource={fundingSource}
                            createOrder={createPayPalOrder}
                            onApprove={onApprove}
                        />
                    </PayPalScriptProvider>
                </div>
            </main>
        </div>
    )
}