import axios, { AxiosError } from "axios"
import { useMutation } from "react-query"
import type { PayPalScriptOptions } from "@paypal/paypal-js";
import type { FUNDING_SOURCE } from '@paypal/paypal-js'
import { generateOrder, generateRequest } from "../../services/paypal/orders";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string
const fundingSource: FUNDING_SOURCE = 'paypal'
const options: PayPalScriptOptions = {
    'client-id': clientId,
    currency: 'USD',
}

function useOrders() {
    const createMutation = useMutation<{ data: any }, AxiosError, any, Response>(
        (): any => generateOrder(1),
    )
    const captureMutation = useMutation<string, AxiosError, any, Response>(
        (data): any => generateRequest(data),
    )
    const createPayPalOrder = async (): Promise<string> => {
        const response = await createMutation.mutateAsync({})
        return response.data.orderID
    }
    
    const onApprove = async (data: OnApproveData): Promise<void> => {
        return captureMutation.mutate({ orderID: data.orderID })
    }

    return {
        createPayPalOrder,
        onApprove,
        options,
        fundingSource
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