import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}, 
  middleware: (getDefault) => getDefault(), 
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
