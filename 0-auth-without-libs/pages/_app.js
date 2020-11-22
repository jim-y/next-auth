import '../styles/globals.css'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import UserProvider from '../src/UserProvider'
import Navigation from '../src/components/Navigation'
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head key="meta">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Navigation />
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
