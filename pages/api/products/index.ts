// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../core/product'
import _products from '../../../data/products.json'
import { Products } from './sum'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
    let { page, quantity } = req.query

    if (!page) {
        page = "1"
    }

    if (!quantity) {
        quantity = "3"
    }

    if (typeof page !== 'string') {
        res.status(400).end('page param is not a number')
        return
    }

    const pageConverted = Number.parseInt(page)
    if (Number.isNaN(pageConverted)) {
        res.status(400).end('page param is not a number')
        return
    }

    if (typeof quantity !== 'string') {
        res.status(400).end('quantity param is not a number')
        return
    }

    const quantityConverted = Number.parseInt(quantity)
    if (Number.isNaN(quantityConverted)) {
        res.status(400).end('quantity param is not a number')
        return
    }

    res.status(200).json(getPaginatedProducts(pageConverted, quantityConverted))
}

function getPaginatedProducts(page: number = 1, quantity: number = 3) {
    const index = (page - 1) * quantity
    const products = _products as unknown as Products
    const keys = Object.keys(products)
    const productsIds = keys.slice(index, index + quantity)
    return productsIds.map(id => products[id])
}