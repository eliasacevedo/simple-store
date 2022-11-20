import { toast } from "react-toastify";
import { Product } from "../../core/product";
import useCheckout from "../checkout/useCheckout";

export default function useProductItem(product: Product) {
    const { addProductToShoppingCart } = useCheckout()
    const onClickBuyButton = (e: any) => {
        addProductToShoppingCart(product.id)
        toast(`Added ${product.name} to shopping cart!`)
    }

    return {
        onClickBuyButton
    }
}