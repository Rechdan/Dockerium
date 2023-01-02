import { AppProps } from "next/app";
import Head from "next/head";

import { memo } from "react";
import { ToastContainer } from "react-toastify";

import { PROJECT_NAME } from "_/consts";

import GlobalStyle from "_/styles/global";
import "_/styles/ReactToastify.min.css";

const App = memo(({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>{PROJECT_NAME}</title>
    </Head>
    <GlobalStyle />
    <Component {...pageProps} />
    <ToastContainer theme="colored" />
  </>
));

export default App;
