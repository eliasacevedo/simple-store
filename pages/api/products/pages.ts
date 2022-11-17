// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { initialQuantityPerPage } from '.'
import { Product } from '../../../core/product'
import _products from '../../../data/products.json'

export type Products = {[id: string]: Product}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
    let { quantity } = req.query

    if (!quantity) {
        quantity = initialQuantityPerPage.toString()
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

    res.status(200).json(getQuantityPages(quantityConverted))
}

function getQuantityPages(quantityPerPage: number = initialQuantityPerPage) {
    const products = _products as unknown as Products
    return Math.ceil(Object.keys(products).length / quantityPerPage)
}