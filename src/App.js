import React, { useEffect, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Navbar, ScrollToTop, Footer } from './components/Layout';
import Landing from './components/Landing';
import MovieDetail from './components/Movie/MovieDetail';
import { createBrowserHistory } from 'history';
import MovieList from './components/MovieList/MovieList';
import SearchResult from './components/Movie/SearchResult';

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
            <Route
              exact
              path='/:type/all/:genre/page=:page'
              component={MovieList}
            />
            <Route exact path='/:type/all/:genre' component={MovieList} />
            <Route exact path='/search/q=:query' component={SearchResult} />
          </Switch>
          <Footer />
        </Fragment>
      </ScrollToTop>
    </Router>
  );
}

export default App;
