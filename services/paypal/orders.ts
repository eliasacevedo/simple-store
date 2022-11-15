import axios from "axios";
import { PATH_PAYPAL_CAPTURE_ORDER, PATH_PAYPAL_CREATE_ORDER } from "../constants";

async function generateOrder(amount: number, currency: string = 'USD') {
    return await axios.post(PATH_PAYPAL_CREATE_ORDER)
}

async function generateRequest(orderId: string) {
    return await axios.post(PATH_PAYPAL_CAPTURE_ORDER, orderId)
}

export {
    generateOrder,
    generateRequest
}