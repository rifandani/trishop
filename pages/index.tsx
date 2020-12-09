import Head from 'next/head';
// files
import Header from '../components/Header';
import Portfolio from '../components/Portfolio';
import Customers from '../components/Customers';
import StoresHome from '../components/StoresHome';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>TriShop - Creative Custom Cake Shop</title>
      </Head>

      <Header />

      <Portfolio />

      <Customers />

      <StoresHome />

      <CTA />

      <Footer />
    </>
  );
}
