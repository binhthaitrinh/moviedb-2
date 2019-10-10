import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { searchMovies, getCredit } from '../../actions/movie';
import { movieGenre, TvGenre } from '../../constants/Genre';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';

const SearchResult = ({ match, searchMovies, movies, loading }) => {
  useEffect(() => {
    searchMovies(match.params.query);
  }, [searchMovies, match.params.query]);

  const helper = (id, type = 'movie') => {
    let result = '';

    type === 'movie'
      ? movieGenre.genres.forEach(genre => {
          if (genre.id === id) {
            result = genre.name;
          }
        })
      : TvGenre.genres.forEach(genre => {
          if (genre.id === id) {
            result = genre.name;
          }
        });
    return result;
  };
  return (
    <div className='section-search-result'>
      <div className='movie-list-container'>
        <h1 className='section-title'>
          Search result for{' '}
          <span className='text-cap'>{match.params.query}</span>
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='movie-grid'>
            {movies.map(movie => (
              <Link to='/' key={movie.id} className='movie-item'>
                <div className='poster'>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt=''
                    />
                  ) : (
                    <img src='https://via.placeholder.com/300' alt='' />
                  )}

                  <div className='rating'>
                    <p>{movie.vote_average}</p>
                    <i className='fas fa-star'></i>
                  </div>
                </div>
                <div className='movie-info'>
                  {' '}
                  <h3>{movie.title || movie.name}</h3>
                  <p> {movie.genre_ids.map(id => helper(id)).join(' - ')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  movies: state.movie.movie.SEARCH_MOVIES,
  loading: state.movie.loading.SEARCH_MOVIES
});

export default connect(
  mapStateToProps,
  { searchMovies }
)(SearchResult);
