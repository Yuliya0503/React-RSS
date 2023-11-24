import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

const RootLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Star Wars</title>
      <link rel="icon" type="image/png" href="/star.png" />
    </Head>
    {children}
  </>
);

export default RootLayout;
