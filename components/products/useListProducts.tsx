import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Product } from "../../core/product"
import { getProducts, getQuantityOfPages } from "../../services/products/product"

const baseProductPage = '/products'

export default function useListProducts() {
    const { push, query, isReady } = useRouter()
    const page = getPageUrl(query)

    useEffect(() => {
        setActualPage(page)
    }, [isReady])

    const [actualPage, setActualPage] = useState(page)

    useEffect(() => {
        if(!isReady) {
            return
        }
        
        push(baseProductPage, {query: { page: actualPage }})
    }, [actualPage])
    
    const itemsQuery = useQuery<AxiosResponse<Product[], any>, AxiosError>(`products-page-${actualPage}`, async () => await getProducts(actualPage))
    const quantityPageQuery = useQuery<AxiosResponse<number, any>, AxiosError>(`pages-quantity`, async () => await getQuantityOfPages())

    const quantityPages = quantityPageQuery.data?.data || 0

    const shouldNextButtonActive = actualPage < quantityPages
    const shouldPreviousButtonActive = actualPage > 1

    const onClickNextButton = () => {
        const nextPage = actualPage + 1
        setActualPage(nextPage)
    }

    const onClickPreviousButton = () => {
        const nextPage = actualPage - 1
        setActualPage(nextPage)
    }

    return {
        actualPage,
        itemsQuery,
        shouldNextButtonActive,
        shouldPreviousButtonActive,
        onClickNextButton,
        onClickPreviousButton,
    }
}


function getPageUrl(page: ParsedUrlQuery): number {
    const value = page['page']
  
    if (!value || Array.isArray(value)) {
        return 1
    }
  
    const parsedValue = convertStringToInt(value, 1)
    return parsedValue
  }
  
  function convertStringToInt(value: string, initial: number = 0) {
    const result = Number.parseInt(value)
    if (Number.isNaN(result)) {
        return initial
    }
  
    return result
  }