import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
