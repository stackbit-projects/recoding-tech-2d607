import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import ScriptTag from 'react-script-tag'
import { ThemeProvider } from '@material-ui/core/styles'
import { withPrefix } from '../utils'
import theme from '../theme.js'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <ThemeProvider theme={theme}>
            <Main />
          </ThemeProvider>
          <ScriptTag src={withPrefix('js/init.js')} />
          <ScriptTag src={withPrefix('js/page-load.js')} />
          <ScriptTag src={withPrefix('js/page-unload.js')} />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
