import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/ui/Layout';
import theme from '@/styles/theme';
import '../../styles/globals.css';

// @ts-ignore
export default function App({ Component, pageProps }: AppProps) {
    const isAuthPage = Component.displayName === 'Login' || 
                      Component.displayName === 'Register' || 
                      Component.displayName === 'ForgotPassword';

    return (
        // @ts-ignore
        <ChakraProvider theme={theme}>
            <Toaster position="top-right" />
            {isAuthPage ? (
                <Component {...pageProps} />
            ) : (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )}
        </ChakraProvider>
    );
}