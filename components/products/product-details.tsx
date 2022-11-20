import { Product } from "../../core/product";
import useProductItem from "./useProductItem";

export default function ProductDetails(product: Product) {
    const { onClickBuyButton } = useProductItem(product)
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={`data:image/png;base64,${product.photo}`} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{product.name}</h1>
                    <p className="py-6">{product.description}</p>
                    <p className="mb-10">${product.amount}</p>
                    <button onClick={onClickBuyButton} className="btn btn-primary">Add shopping cart</button>
                </div>
            </div>
        </div>
    )
}
