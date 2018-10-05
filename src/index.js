import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import './index.css';
import './themes/halloween.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
