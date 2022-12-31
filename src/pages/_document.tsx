import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

import { ServerStyleSheet } from "styled-components";

export default class extends Document {
  static override getInitialProps = async (ctx: DocumentContext) => {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => {
        return originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      };

      const initialProps = await Document.getInitialProps(ctx);

      return { ...initialProps, styles: [initialProps.styles, sheet.getStyleElement()] };
    } finally {
      sheet.seal();
    }
  };

  override render = () => (
    <Html lang={this.props.locale}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
