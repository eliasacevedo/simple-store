// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CheckoutItem } from '../../../core/checkout-item'
import { Product } from '../../../core/product'
import { ShoppingCartItem } from '../../../core/shopping-cart-item'
import _products from '../../../data/products.json'

export type Products = {[id: string]: Product}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutItem[]>
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
    res.status(200).json(getCheckoutItems(ids))
}

function getCheckoutItems(items: ShoppingCartItem[]): CheckoutItem[] {
    const products = _products as unknown as Products
    const result = items.map(item => {
        const checkoutItem: CheckoutItem =  {
            product: products[item.productId],
            quantity: item.quantity
        }

        return checkoutItem
    }) || []
    return result
}

