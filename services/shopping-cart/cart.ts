import axios from "axios";
import { CheckoutItem } from "../../core/checkout-item";
import { ShoppingCartItem } from "../../core/shopping-cart-item";
import { PATH_CHECKOUT_LIST, PATH_PRODUCTS_SUM } from "../constants";

let products: ShoppingCartItem[] = []
const localStorageId = 'simple-store-shopping-cart'

function refreshProductsFromLocalStorage() {
    if(typeof window === 'undefined') {
        return
    }

    const result = localStorage.getItem(localStorageId)
    if(!result) {
        localStorage.setItem(localStorageId, '[]')
        products = []
        return
    }

    products = JSON.parse(result)
}

function saveProductsInLocalStorage() {
    if(typeof window === 'undefined') {
        return
    }
    localStorage.setItem(localStorageId, JSON.stringify(products))
}

function getProduct(id: string) {
    return products.find(product => product.productId === id)
}

function addProduct(product: ShoppingCartItem) {
    products.push(product)
    saveProductsInLocalStorage()
}

function deleteProduct(id: string) {
    products = products.filter(n => id !== n.productId)
    saveProductsInLocalStorage()
}

function deleteAllProducts() {
    products = []
    saveProductsInLocalStorage()
}

async function getSumValueProducts() {
    return await axios.post<number>(PATH_PRODUCTS_SUM, products)    
}

async function getCheckoutItems() {
    return await axios.post<CheckoutItem[]>(PATH_CHECKOUT_LIST, products)
}

function getShoppingCartProductIdList() {
    return products.map(product => product.productId)
}

function getQuantityOfProducts() {
    let total = 0
    products.forEach(product => total += product.quantity)
    return total
}

export {
    products,
    getProduct,
    addProduct,
    deleteProduct,
    deleteAllProducts,
    refreshProductsFromLocalStorage,
    getSumValueProducts,
    getCheckoutItems,
    getShoppingCartProductIdList,
    getQuantityOfProducts
}