import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Layout from '@/components/ui/Layout';
import '../../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const isAuthPage = Component.displayName === 'Login' || 
                      Component.displayName === 'Register' || 
                      Component.displayName === 'ForgotPassword';

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            // @ts-ignore
            <ChakraProvider>
                <Toaster position="top-right" />
                {isAuthPage ? (
                    <Component {...pageProps} />
                ) : (
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                )}
            </ChakraProvider>
        </>
    );
}