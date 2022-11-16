import { AxiosResponse } from "axios"
import Error from "next/error"
import { useQuery } from "react-query"
import { CheckoutItem } from "../../core/checkout-item"
import { getCheckoutItems, getShoppingCartProductIdList, getSumValueProducts, products } from "../../services/shopping-cart/cart"

export default function useCheckout() {
    const listIdsItems = getShoppingCartProductIdList()
    const listIdsString = JSON.stringify(listIdsItems)

    const checkoutItemsQuery = useQuery<AxiosResponse<CheckoutItem[]>, Error>(`products-${listIdsString}`, async () => await getCheckoutItems())
    const totalPaymentQuery = useQuery<AxiosResponse<number>, Error>(`shopping-cart-items-${listIdsString}`, async () => await getSumValueProducts()) 

    return {
        checkoutItemsQuery,
        totalPaymentQuery
    }
}
