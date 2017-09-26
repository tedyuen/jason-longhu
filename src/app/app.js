import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import Routes from './router/Routes';
import registerServiceWorker from './registerServiceWorker';
import './main.scss'


ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
