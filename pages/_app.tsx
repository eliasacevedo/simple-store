import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query'
import BasePage from '../components/base/base-page'

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BasePage>
        <Component {...pageProps} />
      </BasePage>
    </QueryClientProvider>
  )
}
