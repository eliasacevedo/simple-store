import axios from "axios";
import { CheckoutItem } from "../../core/checkout-item";
import { ShoppingCartItemList } from "../../core/shopping-cart-item-list";
import { PATH_CHECKOUT_LIST, PATH_PRODUCTS_SUM } from "../constants";

const localStorageId = 'simple-store-shopping-cart'

function getProductsFromLocalStorage() {
    if(typeof window === 'undefined') {
        return
    }

    const result = localStorage.getItem(localStorageId)
    if(!result) {
        localStorage.setItem(localStorageId, '{}')
        return
    }

    return JSON.parse(result) as ShoppingCartItemList
}

function saveProductsInLocalStorage(products: ShoppingCartItemList) {
    if(typeof window === 'undefined') {
        return
    }
    localStorage.setItem(localStorageId, JSON.stringify(products))
}

function deleteAllProducts() {
    saveProductsInLocalStorage({})
}

async function getSumValueProducts(products: ShoppingCartItemList) {
    return await axios.post<number>(PATH_PRODUCTS_SUM, Object.values(products))    
}

async function getCheckoutItems(products: ShoppingCartItemList) {
    return await axios.post<CheckoutItem[]>(PATH_CHECKOUT_LIST, Object.values(products))
}

function getShoppingCartProductIdList(products: ShoppingCartItemList) {
    return Object.keys(products)
}

function getQuantityOfProducts(products: ShoppingCartItemList) {
    let total = 0
    Object.values(products).forEach(product => total += product.quantity)
    return total
}

export {
    getProductsFromLocalStorage,
    saveProductsInLocalStorage,
    deleteAllProducts,
    getSumValueProducts,
    getCheckoutItems,
    getShoppingCartProductIdList,
    getQuantityOfProducts
}