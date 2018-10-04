import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './themes/halloween.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
