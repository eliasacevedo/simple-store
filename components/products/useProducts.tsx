import { AxiosError, AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { Product } from "../../core/product"
import { getProductById } from "../../services/products/product"

export default function useProducts(id: string) {
    const productQuery = useQuery<AxiosResponse<Product>, AxiosError>(`product-${id}`, async () => await getProductById(id))
    
    return {
        productQuery
    }
}