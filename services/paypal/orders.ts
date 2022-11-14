import axios from "axios";
import paypal from "../../lib/paypal";

async function generateOrder(amount: number, currency: string = 'USD') {
    return await axios.post('/api/paypal/createOrder')
}

async function generateRequest(orderId: string) {
    return await axios.post('/api/paypal/captureOrder', orderId)
}

export {
    generateOrder,
    generateRequest
}