import React, { useEffect, useState } from 'react';
import { getPopular, getTopRated, getNowPlaying } from '../../actions/movie';
import MovieCarousels from '../Carousels/MovieCarousels';
import { connect } from 'react-redux';
import SpinnerSm from '../Layout/SpinnerSm';

const TVLandingCarousels = ({
  popular,
  nowPlaying,
  topRated,
  getPopular,
  getTopRated,
  getNowPlaying
}) => {
  return <div></div>;
};

const mapStateToProps = state => ({
  popular: state.movie.movie.GET_POPULAR,
  nowPlaying: state.movie.movie.GET_NOW_PLAYING,
  topRated: state.movie.movie.GET_TOP_RATED,
  loading: state.movie.loading
});

export default connect(
  mapStateToProps,
  { getPopular, getTopRated, getNowPlaying }
)(TVLandingCarousels);
