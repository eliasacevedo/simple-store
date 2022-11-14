import { Product } from "../../core/product";

let products: Product[] = []
const localStorageId = 'simple-store-shopping-cart'

function getProductsFromLocalStorage() {
    const result = localStorage.getItem(localStorageId)
    if(!result) {
        localStorage.setItem(localStorageId, '[]')
        products = []
        return
    }

    products = JSON.parse(result)
}

function saveProductsInLocalStorage() {
    localStorage.setItem(localStorageId, JSON.stringify(products))
}

function getProduct(id: string) {
    return products.find(product => product.id === id)
}

function addProduct(product: Product) {
    products.push(product)
    saveProductsInLocalStorage()
}

function deleteProduct(id: string) {
    products = products.filter(n => id !== n.id)
    saveProductsInLocalStorage()
}

function deleteAllProducts() {
    products = []
    saveProductsInLocalStorage()
}

function getSumValueProducts() {
    let result = 0
    products.forEach(product => result += product.amount)
    return result
}

export {
    products,
    getProduct,
    addProduct,
    deleteProduct,
    deleteAllProducts,
    getProductsFromLocalStorage,
    getSumValueProducts
}