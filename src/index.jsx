import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenProvider from './context/TokenContext';
import App from './App';
import ShowFormProvider from './context/ShowRegister';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/es/devtools/devtools';
import CartProvider from './context/Cart';
const root = ReactDOM.createRoot(document.getElementById('root'));

const query = new QueryClient();
root.render(
    <QueryClientProvider client={query}>
        <TokenProvider>
            <CartProvider>
                <ShowFormProvider>
                    <App />
                </ShowFormProvider>
            </CartProvider>
            <ReactQueryDevtools />
        </TokenProvider>
    </QueryClientProvider>
);
