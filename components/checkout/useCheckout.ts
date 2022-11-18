import { AxiosError, AxiosResponse } from "axios"
import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { ShoppingCartContext } from "../../context/shopping-cart"
import { CheckoutItem } from "../../core/checkout-item"
import { ShoppingCartItem } from "../../core/shopping-cart-item"
import { ShoppingCartItemList } from "../../core/shopping-cart-item-list"
import {  getCheckoutItems, getQuantityOfProducts, getShoppingCartProductIdList, getSumValueProducts, saveProductsInLocalStorage } from "../../services/shopping-cart/cart"

export default function useCheckout() {
    const [shoppingCartItems, setShoppingCartItems] = useContext(ShoppingCartContext)
    const listIdsItems = getShoppingCartProductIdList(shoppingCartItems)
    const listIdsString = JSON.stringify(listIdsItems)
    const checkoutItemsQuery = useQuery<AxiosResponse<CheckoutItem[]>, AxiosError>(`products-${listIdsString}`, async () => await getCheckoutItems(shoppingCartItems))
    const totalPaymentQuery = useQuery<AxiosResponse<number>, AxiosError>(`shopping-cart-items-${listIdsString}`, async () => await getSumValueProducts(shoppingCartItems)) 

    const [quantity, setQuantityItems] = useState(0)

    useEffect(() => {
        saveProductsInLocalStorage(shoppingCartItems)
        setQuantityItems(getQuantityOfProducts(shoppingCartItems))
    }, [shoppingCartItems])

    function addProduct(product: ShoppingCartItem) {
        const products = { ...shoppingCartItems }
        if (products[product.productId]) {
            product.quantity += products[product.productId].quantity
        }

        products[product.productId] = product
        setShoppingCartItems(products)
    }

    const addProductToShoppingCart = (productId: string, quantity: number = 1) => {
        const shoppingItem: ShoppingCartItem = {
            productId: productId,
            quantity: quantity
        }

        addProduct(shoppingItem)
    }

    function deleteProduct(id: string) {
        const shoppingCart = { ...shoppingCartItems }
        delete shoppingCart[id]
        setShoppingCartItems(shoppingCart)
    }

    function cleanShoppingCart() {
        setShoppingCartItems({})
    }

    return {
        shoppingCartItems,
        quantity,
        checkoutItemsQuery,
        totalPaymentQuery,
        addProductToShoppingCart,
        deleteProduct,
        cleanShoppingCart
    }
}




