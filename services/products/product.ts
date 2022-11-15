import axios from "axios";
import { Product } from "../../core/product";
import { PATH_PRODUCTS } from "../constants";

async function getProducts(): Promise<Product[]> {
    return await axios.get(PATH_PRODUCTS)
}

async function getProductById(id: string): Promise<Product> {
    return await axios.get(`${PATH_PRODUCTS}/${id}`)
}

async function getSumOfProducts(ids: string[]) {
    return await axios.post(`${PATH_PRODUCTS}/sum`, ids)
}

export {
    getProducts,
    getProductById,
    getSumOfProducts
}
