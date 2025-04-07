import type {AppProps} from 'next/app';
import Layout from '@/components/ui/Layout';
import '../../styles/globals.css';


export default function App ({ Component, pageProps }: AppProps) {
    const isAuthPage = Component.name == 'Login';

    return isAuthPage ? (
        <Component {...pageProps} />
    ) : (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}