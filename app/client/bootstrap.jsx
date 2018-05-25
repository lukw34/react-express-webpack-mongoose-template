import React from 'react';
import ReactDOM from 'react-dom';


import './shared/styles/scss/main.scss';
import App from './components/App';

ReactDOM.render(<App
    technologies={['react', 'sass', 'webpack', 'express', 'js', 'node', 'mongodb']}
/>, document.getElementById('app'));