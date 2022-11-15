import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/paypal'
import paypal from '@paypal/checkout-server-sdk'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const { orderID } = req.body

    if (!orderID) {
        res.status(400).end('missing orderID')
    }
    try {
        const response = await captureOrder(orderID)
        res.status(200).json({ ...response.result })
    } catch (error) {
        res.status(400).end(error)
    }
}

async function captureOrder(orderID: string) {
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({
        payment_source: {
            token: {
                id: orderID,
                type: 'BILLING_AGREEMENT'
            }
        }
    })

    const response = await PaypalClient.execute(request)

    if (!response) {
        throw `error capturing order: ${orderID}`
    }

    return response
}