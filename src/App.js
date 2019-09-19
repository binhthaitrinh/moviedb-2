import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, ScrollToTop } from './components/Layout';

import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Fragment>
          <Navbar />
          {/* <Route exact path="/" component={Landing} /> */}
        </Fragment>
      </ScrollToTop>
    </Router>
  );
}

export default App;
