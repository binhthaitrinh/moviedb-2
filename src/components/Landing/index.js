import React, { Fragment, useEffect } from 'react';
import { getTrending } from '../../actions/movie';
import { connect } from 'react-redux';
import Header from './Header';
import Spinner from '../Layout/Spinner';
import MainContent from './MainContent';

const Landing = ({ getTrending, trendingMovies, trendingMoviesLoading }) => {
  useEffect(() => {
    getTrending();
  }, [getTrending]);

  return trendingMoviesLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header movies={trendingMovies} />
      <MainContent />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  trendingMovies: state.movie.movie.GET_TRENDING,
  trendingMoviesLoading: state.movie.loading.GET_TRENDING
});

export default connect(
  mapStateToProps,
  { getTrending }
)(Landing);
