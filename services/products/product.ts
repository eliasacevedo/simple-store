import axios from "axios";
import { Product } from "../../core/product";
import { PATH_PRODUCTS } from "../constants";

async function getProducts() {
    return await axios.get<Product[]>(PATH_PRODUCTS)
}

async function getProductById(id: string) {
    return await axios.get<Product>(`${PATH_PRODUCTS}/${id}`)
}

async function getSumOfProducts(ids: string[]) {
    return await axios.post<number>(`${PATH_PRODUCTS}/sum`, ids)
}

export {
    getProducts,
    getProductById,
    getSumOfProducts
}
