import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import AdminPanel from './components/AdminPanel/AdminPanel';
import StatBoard from './components/StatBoard';

const App = () => (
  <HashRouter>
    <div className="router">
      <Route exact path="/" component={StatBoard} />
      <Route path="/admin" component={AdminPanel} />
    </div>
  </HashRouter>
);

export default App;
