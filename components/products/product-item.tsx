import Link from "next/link";
import { Product } from "../../core/product";
import useProductItem from "./useProductItem";

export default function ProductItem(product: Product) {
    const { onClickBuyButton } = useProductItem(product)
    return (
        <div className="card w-full h-full bg-base-100 shadow-xl">
            <figure className="h-60"><img className="w-full" src={`data:image/png;base64,${product.photo}`} alt={product.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>${product.amount}</p>
                <div className="card-actions flex flex-nowrap">
                    <Link className="btn btn-secundary w-2/4" href={`/products/${product.id}`}>More details</Link>
                    <button onClick={onClickBuyButton} className="btn btn-primary w-2/4">Add shopping cart</button>
                </div>
            </div>
        </div>
    )
}