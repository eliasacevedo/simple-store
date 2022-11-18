import { useContext, useEffect } from "react"
import { ShoppingCartContext } from "../../context/shopping-cart"
import useCheckout from "../checkout/useCheckout"
import Footer from "./footer"
import Header from "./header"

export interface BasePageProps{
    children: React.ReactNode
}
export default function BasePage({children}: BasePageProps) {
    const { quantity, totalPaymentQuery } = useCheckout()
    return (
        <div className="min-h-screen flex flex-col">
            <Header quantity={quantity} totalPayment={totalPaymentQuery.data?.data || 0}/>
            <main className="p-6 flex flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}