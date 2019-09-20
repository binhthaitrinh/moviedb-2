import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, ScrollToTop } from './components/Layout';
import Landing from './components/Landing';
import MovieDetail from './components/Movie/MovieDetail';

import './App.css';

function App() {
  console.log(window);
  return (
    <Router>
      <ScrollToTop>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/movie/details/:id" component={MovieDetail} />
          </Switch>
        </Fragment>
      </ScrollToTop>
    </Router>
  );
}

export default App;
