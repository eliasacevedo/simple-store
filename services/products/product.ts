import axios from "axios";
import { Product } from "../../core/product";
import { PATH_PRODUCTS, PATH_PRODUCTS_PAGES, PATH_PRODUCTS_SUM } from "../constants";

async function getProducts(page: number = 1) {
    return await axios.get<Product[]>(`${PATH_PRODUCTS}?page=${page}`)
}

async function getProductById(id: string) {
    return await axios.get<Product>(`${PATH_PRODUCTS}/${id}`)
}

async function getSumOfProducts(ids: string[]) {
    return await axios.post<number>(PATH_PRODUCTS_SUM, ids)
}

async function getQuantityOfPages() {
    return await axios.post<number>(PATH_PRODUCTS_PAGES)
}

export {
    getProducts,
    getProductById,
    getSumOfProducts,
    getQuantityOfPages
}
