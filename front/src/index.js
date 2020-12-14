import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import './assets/base.scss';
import App from './App';

import { Provider } from 'react-redux';

import store from './configureStore';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);