import React, { useEffect } from 'react';
import './App.css';
import {
  getTrending,
  getNowPlaying,
  getTopRated,
  getPopular
} from './actions/movie';
import { connect } from 'react-redux';

function App({ getTrending, getNowPlaying, getTopRated, getPopular }) {
  useEffect(() => {
    getTrending();
    getNowPlaying('movie');
    getTopRated('movie');
    getPopular('movie');
  }, [getTrending, getNowPlaying, getTopRated, getPopular]);
  return <div className="App">App</div>;
}

export default connect(
  null,
  { getTrending, getNowPlaying, getTopRated, getPopular }
)(App);
