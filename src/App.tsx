import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  HomePage,
  MyAccount
} from './pages'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/my-account" component={MyAccount} />
      </Switch>
    </Router>
  );
}

export default App;