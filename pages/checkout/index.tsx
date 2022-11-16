import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import CheckoutItemComponent from "../../components/checkout/checkout-item"
import useCheckout from "../../components/checkout/useCheckout"
import useOrders from "../../components/orders/useOrders"
import { refreshProductsFromLocalStorage } from "../../services/shopping-cart/cart"

export default function CheckoutPage() {
    refreshProductsFromLocalStorage()
    
    const { checkoutItemsQuery, totalPaymentQuery } = useCheckout()
    const { createPayPalOrder, onApprove, options, fundingSource, capturePayment } = useOrders(totalPaymentQuery.data?.data)
    
    return (
        <div>
            <div className="header">
                <h2 className="header">Shopping cart items</h2>
            </div>
            <main className="content">
                <div className="products-list">
                {
                    checkoutItemsQuery.isLoading ?? 'Loading...'
                }
                {
                    checkoutItemsQuery.data?.data.map(product => <CheckoutItemComponent key={product.product.id} {...product}/>)
                }
                </div>
                <div className="summary">
                    <h3 className="summary-text">Total Invoice: {totalPaymentQuery.data?.data.toFixed(2)}</h3>
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