import axios from "axios";
import { Payment } from "../../core/payment";
import { PATH_PAYPAL_CAPTURE_ORDER, PATH_PAYPAL_CREATE_ORDER } from "../constants";

async function generateOrder(amount: number, currency: string = 'USD') {
    const payment: Payment = {
        amount: amount,
        currency: currency
    }
    return await axios.post(PATH_PAYPAL_CREATE_ORDER, payment)
}

async function generateRequest(orderId: string) {
    return await axios.post(PATH_PAYPAL_CAPTURE_ORDER, orderId)
}

export {
    generateOrder,
    generateRequest
}