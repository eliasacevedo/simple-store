import { CheckoutItem } from "../../core/checkout-item";
import useCheckout from "./useCheckout";

export default function CheckoutItemComponent(checkoutItem: CheckoutItem) {
    const { removeProductQuantity, addProductToShoppingCart, shoppingCartItems } = useCheckout()
    const actualItem = shoppingCartItems[checkoutItem.product.id]
    return (
        <div className="card card-side bg-base-100 shadow-xl h-full">                
            <figure className="card-figure w-32">
                <img src={`data:image/png;base64,${checkoutItem.product.photo}`} alt={checkoutItem.product.description} />
            </figure>
            <div className="card-body w-64">
                <h3 className="card-title">{checkoutItem.product.name}</h3>
                <div className="btn-group">
                    <button onClick={() => removeProductQuantity(checkoutItem.product.id)} className={`btn }`}>-</button>
                    <button className="btn">{actualItem.quantity} items</button>
                    <button onClick={() => addProductToShoppingCart(checkoutItem.product.id)} className={`btn`}>+</button>
                </div>
                <p className="card-total">Total: ${(checkoutItem.product.amount * actualItem.quantity).toFixed(2)}</p>
            </div>
        </div>
    )    
}