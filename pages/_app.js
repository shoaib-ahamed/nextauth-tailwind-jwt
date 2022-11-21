import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Layout from '../layout/layout';
import { DataProvider } from '../store/GlobalState';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <DataProvider>
        <Navbar/>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </SessionProvider>
  )
}

export default MyApp
