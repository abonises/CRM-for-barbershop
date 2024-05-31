import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style/index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import {store} from "./app/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>,
    </Provider>
)
