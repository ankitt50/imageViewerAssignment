import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './screens/login/Login';
import Header from './common/header/Header';

ReactDOM.render(
    <div>
        <Header />
        <Login />
    </div>
    ,
    document.getElementById('root')
);
