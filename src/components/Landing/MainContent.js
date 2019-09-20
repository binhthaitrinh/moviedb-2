import React, { useEffect } from 'react';
import { getPopular, getTopRated, getNowPlaying } from '../../actions/movie';
import MovieCarousels from '../Carousels/MovieCarousels';
import { connect } from 'react-redux';

const MainContent = ({
  getPopular,
  popular,
  nowPlaying,
  loading,
  getTopRated,
  getNowPlaying,
  topRated
}) => {
  useEffect(() => {
    getPopular();
    getNowPlaying();
    getTopRated();
  }, [getPopular, getTopRated, getNowPlaying]);

  return (
    <div className="main-content">
      <div className="container">
        <div className="type-selector">
          <label htmlFor="type-toggle">
            <input type="checkbox" id="type-toggle" />
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
            {loading.GET_POPULAR ? null : <MovieCarousels movies={popular} />}
          </div>
          <div className="movie-carousel-container mb-2">
            <h2 className="section-heading mb-1">Now Playing Movies</h2>
            {loading.GET_NOW_PLAYING ? null : (
              <MovieCarousels movies={nowPlaying} />
            )}
          </div>
          <div className="movie-carousel-container">
            <h2 className="section-heading mb-1">Top Rated Movies</h2>
            {loading.GET_TOP_RATED ? null : (
              <MovieCarousels movies={topRated} />
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
