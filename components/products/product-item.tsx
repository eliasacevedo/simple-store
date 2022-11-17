import Link from "next/link";
import { Product } from "../../core/product";
import useProductItem from "./useProductItem";

export default function ProductItem(product: Product) {
    const { onClickBuyButton } = useProductItem(product)
    return (
        <Link href={`/products/${product.id}`} className="card w-80 h-full bg-base-100 shadow-xl">
            <figure className="h-60"><img className="w-full" src={`data:image/png;base64,${product.photo}`} alt={product.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.amount}</p>
                <div className="card-actions justify-end">
                    <button onClick={onClickBuyButton} className="btn btn-primary">Add shopping cart</button>
                </div>
            </div>
        </Link>
    )
}