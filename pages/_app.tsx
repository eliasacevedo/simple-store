import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query'
import BasePage from '../components/base/base-page'
import { ShoppingCartContext } from '../context/shopping-cart'
import { useState } from 'react'
import { ShoppingCartItemList } from '../core/shopping-cart-item-list'
import { getProductsFromLocalStorage } from '../services/shopping-cart/cart'

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  const shoppingCartState = useState<ShoppingCartItemList>(getProductsFromLocalStorage() || {})
  return (
    <ShoppingCartContext.Provider value={shoppingCartState}>
      <QueryClientProvider client={queryClient}>
        <BasePage>
          <Component {...pageProps} />
        </BasePage>
      </QueryClientProvider>
    </ShoppingCartContext.Provider>
  )
}
