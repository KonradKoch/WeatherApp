import '../app/globals.css';
import { AppProps } from 'next/app';
import Layout from '@/app/components/Layout';
import {
  getCurrentLocation,
  getWeatherByLocation,
} from '@/app/requests/getWeather';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
