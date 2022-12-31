import { AppProps } from "next/app";
import Head from "next/head";

import { memo } from "react";

import { PROJECT_NAME } from "_/consts";

import GlobalStyle from "_/styles/global";

const App = memo(({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>{PROJECT_NAME}</title>
    </Head>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
));

export default App;
