import { CheckoutItem } from "../../core/checkout-item";

export default function CheckoutItemComponent(checkoutItem: CheckoutItem) {
    return (
        <div className="indicator">
            <span className="indicator-item badge badge-secondary">{checkoutItem.quantity}</span> 
            <div className="card card-side bg-base-100 shadow-xl">                
                <figure className="card-figure w-32">
                    <img src={`data:image/png;base64,${checkoutItem.product.photo}`} alt={checkoutItem.product.description} />
                </figure>
                <div className="card-body">
                    <h3 className="card-title">{checkoutItem.product.name}</h3>
                    <p className="card-description">{checkoutItem.product.description}</p>
                    <p className="card-total">Total: ${(checkoutItem.product.amount * checkoutItem.quantity).toFixed(2)}</p>
                </div>
            </div>
        </div>
        
    )

    
}