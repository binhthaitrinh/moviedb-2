import React, { useEffect, useState } from 'react';
import { getPopular, getTopRated, getNowPlaying } from '../../actions/movie';
import MovieCarousels from '../Carousels/MovieCarousels';
import { connect } from 'react-redux';
import SpinnerSm from '../Layout/SpinnerSm';
import store from '../../store';

const MainContent = ({
  getPopular,
  popular,
  nowPlaying,
  loading,
  getTopRated,
  getNowPlaying,
  topRated
}) => {
  const [type, setType] = useState('movie');

  useEffect(() => {
    getPopular(type);
    getNowPlaying(type);
    getTopRated(type);
  }, [getPopular, getTopRated, getNowPlaying, type]);

  return (
    <div className="main-content">
      <div className="container">
        <div className="type-selector">
          <label htmlFor="type-toggle">
            <input
              type="checkbox"
              id="type-toggle"
              onChange={e => {
                e.target.checked ? setType('tv') : setType('movie');
                store.dispatch({
                  type: 'SET_LOADING'
                });
              }}
            />
            <span className="type-holder">
              <span className="type-movie">Movie</span>
              <span className="type-tv">TV shows</span>
              <span className="slider"></span>
            </span>
          </label>
        </div>

        <div className="section-movie-list">
          <div className="movie-carousel-container mb-2">
            <h2 className="section-heading mb-1">Popular Movies</h2>
            {loading.GET_POPULAR ? (
              <SpinnerSm />
            ) : (
              <MovieCarousels movies={popular} type={type} />
            )}
          </div>
          <div className="movie-carousel-container mb-2">
            <h2 className="section-heading mb-1">Now Playing Movies</h2>
            {loading.GET_NOW_PLAYING ? (
              <SpinnerSm />
            ) : (
              <MovieCarousels movies={nowPlaying} type={type} />
            )}
          </div>
          <div className="movie-carousel-container">
            <h2 className="section-heading mb-1">Top Rated Movies</h2>
            {loading.GET_TOP_RATED ? (
              <SpinnerSm />
            ) : (
              <MovieCarousels movies={topRated} type={type} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
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
)(MainContent);
