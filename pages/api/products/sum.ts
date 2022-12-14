// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../core/product'
import { ShoppingCartItem } from '../../../core/shopping-cart-item'
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

    const ids = req.body as ShoppingCartItem[]
    res.status(200).json(sumProducts(ids))
}

function sumProducts(items: ShoppingCartItem[]) {
    let sum = 0
    const products = _products as unknown as Products

    items.forEach(item => {
        const product = products[item.productId];
        if (!product) {
            return
        }

        sum += product.amount * item.quantity
    })

    return sum
}