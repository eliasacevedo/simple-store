import { useEffect } from "react"
import useCheckout from "../../components/checkout/useCheckout"
import { deleteAllProducts } from "../../services/shopping-cart/cart"

export default function ThanksPage() {
    const { cleanShoppingCart } = useCheckout()
    
    useEffect(() => {
        cleanShoppingCart()
    }, []) 
    
    return (
        <div className="container">
            <h2>Thanks for buy</h2>
        </div>
    )
}