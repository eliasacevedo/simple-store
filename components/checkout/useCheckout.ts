import { AxiosError, AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { CheckoutItem } from "../../core/checkout-item"
import { getCheckoutItems, getShoppingCartProductIdList, getSumValueProducts, getQuantityOfProducts } from "../../services/shopping-cart/cart"

export default function useCheckout() {
    const listIdsItems = getShoppingCartProductIdList()
    const listIdsString = JSON.stringify(listIdsItems)
    const quantity = getQuantityOfProducts()
    const checkoutItemsQuery = useQuery<AxiosResponse<CheckoutItem[]>, AxiosError>(`products-${listIdsString}`, async () => await getCheckoutItems())
    const totalPaymentQuery = useQuery<AxiosResponse<number>, AxiosError>(`shopping-cart-items-${listIdsString}`, async () => await getSumValueProducts()) 

    return {
        checkoutItemsQuery,
        totalPaymentQuery,
        quantity
    }
}
