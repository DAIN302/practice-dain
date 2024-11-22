import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App4 from './App4';
import App5 from './App5';
import App6 from './App6';
import App7 from './App7';
import store from './store'
import { Provider } from 'react-redux';
import { VillagerProvider } from './context/VillagerContext';
import App8 from './App8';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <VillagerProvider>
    //     <App4 />
    // </VillagerProvider>
    // <Provider store={store}>
    //     <App6 />
    // </Provider>
    <App8 />
    
);

