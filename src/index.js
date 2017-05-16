import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
    ReactDOM.render(
        <App />,
        element
    );
}

