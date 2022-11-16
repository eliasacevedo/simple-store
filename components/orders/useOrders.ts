import axios, { AxiosError } from "axios"
import { useMutation } from "react-query"
import type { PayPalScriptOptions } from "@paypal/paypal-js";
import type { FUNDING_SOURCE } from '@paypal/paypal-js'
import { generateOrder, generateRequest } from "../../services/paypal/orders";
import { useRouter } from "next/router";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string
const fundingSource: FUNDING_SOURCE = 'paypal'
const options: PayPalScriptOptions = {
    'client-id': clientId,
    currency: 'USD',
}

function useOrders(totalInvoice: number | undefined) {
    const { push } = useRouter()
    const createMutation = useMutation<{ data: any }, AxiosError, any, Response>(
        (): any => generateOrder(totalInvoice || 0),
    )
    const capturePayment = useMutation<string, AxiosError, any, Response>(
        (data): any => generateRequest(data),
    )
    const createPayPalOrder = async (): Promise<string> => {
        const response = await createMutation.mutateAsync({})
        return response.data.orderID
    }
    
    const onApprove = async (data: OnApproveData): Promise<void> => {
        capturePayment.mutate({ orderID: data.orderID })
        push('/checkout/thanks')
    }

    return {
        createPayPalOrder,
        onApprove,
        options,
        fundingSource,
        capturePayment
    }
}

export default useOrders


interface OnApproveData {
    billingToken?: string | null
    facilitatorAccessToken: string
    orderID: string
    payerID?: string | null
    paymentID?: string | null
    subscriptionID?: string | null
    authCode?: string | null
  }