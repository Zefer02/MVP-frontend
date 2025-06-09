import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultConfig,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { mainnet } from 'wagmi/chains'
import { http } from 'wagmi'

const config = getDefaultConfig({
  appName: 'EthSocial',
  projectId: 'demo', // you can also generate a real one at walletconnect.com
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  }
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
