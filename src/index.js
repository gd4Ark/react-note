import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));


const is_dev = process.env.NODE_ENV === 'development';

if (is_dev && module.hot){
    module.hot.accept();
}