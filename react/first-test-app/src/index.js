import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App5 from './App5';
import App6 from './App6';
import App7 from './App7';
import store from './store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <App5 />
    <Provider store={store}>
        {/* <App6 /> */}
        <App7 />
    </Provider>
);

