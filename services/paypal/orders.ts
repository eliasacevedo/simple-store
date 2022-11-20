import axios from "axios";
import { toast } from "react-toastify";
import { Payment } from "../../core/payment";
import { PATH_PAYPAL_CAPTURE_ORDER, PATH_PAYPAL_CREATE_ORDER } from "../constants";

async function generateOrder(amount: number, currency: string = 'USD') {
    const payment: Payment = {
        amount: amount,
        currency: currency
    }
    const result = await axios.post(PATH_PAYPAL_CREATE_ORDER, payment)
    if (result.status != 200) {
        toast('Something bad happened generating order number, try again')
    } 
    return result
}

async function generateRequest(orderId: string) {
    const result = await axios.post(PATH_PAYPAL_CAPTURE_ORDER, orderId)
    if (result.status != 200) {
        toast('Something bad happened generating request, try again')
    }
    return result
}

export {
    generateOrder,
    generateRequest
}