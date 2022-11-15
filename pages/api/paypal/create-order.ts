import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/paypal'
import paypal from '@paypal/checkout-server-sdk'
import { Payment } from '../../../core/payment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (!req.body) {
        res.status(400).end('invalid body')
        return
    }

    try {
        const payment = req.body as Payment
        const response = await createPaypalOrder(payment)
        res.json({ orderID: response.result.id })
    } catch (error) {
        res.status(400).end(error)
    }
}

async function createPaypalOrder({ amount, currency }: Payment) {
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCreateRequest()
    request.headers.Prefer = 'return=representation'
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: currency,
                    value: amount.toFixed(2),
                }
            }
        ],
    })

    const response = await PaypalClient.execute(request)
    if (response.statusCode !== 201) {
        throw `error paying: ${response.message}`
    }

    return response
}