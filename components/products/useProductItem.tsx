import { Product } from "../../core/product";
import useCheckout from "../checkout/useCheckout";

export default function useProductItem(product: Product) {

    const onClickBuyButton = (e: any) => {
        e.preventDefault()
    }
    return {
        onClickBuyButton
    }
}