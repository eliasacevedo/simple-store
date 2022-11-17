import { Product } from "../../core/product";

export default function ProductDetails(product: Product) {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={`data:image/png;base64,${product.photo}`} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{product.name}</h1>
                    <p className="py-6">{product.description}</p>
                    <p className="mb-10">${product.amount}</p>
                </div>
            </div>
        </div>
    )
}
