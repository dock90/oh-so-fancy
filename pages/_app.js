import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: #f7f9fc;
    margin: 0;
    padding: 0;
    font-family: Roboto, 'Open Sans', sans-serif;
    color: #4c4f5a;
    cursor: crosshair;
  }

  h1, h2 {
    font-family: Lato, sans-serif;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1.1rem;
  }

  a {
    text-decoration: none;
    color: #0872a1;
  }
`



export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('HXPUXTLZ', {
      includedDomains: ['www.dock90.io'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Salt Lake City based startup marketing studio."
          />
          <meta name="keywords" content="Market Validation, Startup Growth, Content Marketing"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto&display=swap');
          </style>
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </div>
    )
}
