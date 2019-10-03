import React, { useEffect, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Navbar, ScrollToTop } from './components/Layout';
import Landing from './components/Landing';
import MovieDetail from './components/Movie/MovieDetail';
import { createBrowserHistory } from 'history';

import './App.css';

const history = createBrowserHistory();

function App() {
  console.log(window);
  return (
    <Router history={history}>
      <ScrollToTop>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/:type/details/:id' component={MovieDetail} />
            <Route exact path='/:type/details/:d' component={MovieDetail} />
          </Switch>
        </Fragment>
      </ScrollToTop>
    </Router>
  );
}

export default App;
