// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../core/product'
import _products from '../../../data/products.json'

export type Products = {[id: string]: Product}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
    if (req.method != 'POST') {
        res.status(400).end('should use POST method with body')
        return
    }

    if(!req.body) {
        res.status(400)
        return
    }

    const ids = JSON.parse(req.body)
    res.status(200).json(sumProducts(ids))
}

function sumProducts(ids: string[]) {
    let sum = 0
    const products = _products as unknown as Products

    ids.forEach(id => {
        const product = products[id];
        if (!product) {
            return
        }

        sum += product.amount
    })

    return sum
}