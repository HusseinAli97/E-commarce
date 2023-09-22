import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenProvider from './context/TokenContext';
import App from './App';
import ShowFormProvider from './context/ShowRegister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
let query = new QueryClient();
root.render(
    <QueryClientProvider client={query}>
        <TokenProvider>
            <ShowFormProvider>
                <App />
            </ShowFormProvider>
        </TokenProvider>
    </QueryClientProvider>
);
