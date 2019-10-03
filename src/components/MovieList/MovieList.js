import React, { useState, useEffect } from 'react';
import { getMovieByGenre } from '../../actions/movie';
import { movieGenre } from '../../constants/Genre';
import { connect } from 'react-redux';
import SpinnerSm from '../Layout/SpinnerSm';
import { Link } from 'react-router-dom';

const MovieList = ({ getMovieByGenre, movies, loading }) => {
  const [genre, setGenre] = useState('Comedy');

  useEffect(() => {
    getMovieByGenre('35');
  }, [getMovieByGenre]);

  const helper = id => {
    let result = '';
    movieGenre.genres.forEach(genre => {
      if (genre.id === id) {
        result = genre.name;
      }
    });
    return result;
  };

  return (
    <div className='movie-list'>
      <div className='movie-list-container'>
        <h1 className='movie-list-title'>Movie list</h1>
        <p className='movie-list-subtext'>
          Browse through great collection of movies
        </p>

        <div className='genre-select'>
          <div className='main-selector'>
            <p>{genre}</p>

            <i class='fas fa-sort-down'></i>
          </div>
          <ul className='genre-choices'>
            {movieGenre.genres.map(genre => (
              <li
                className='genre-choice'
                onClick={() => {
                  setGenre(genre.name);
                  getMovieByGenre(genre.id);
                }}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>

        <div className='movie-grid'>
          {loading ? (
            <SpinnerSm />
          ) : (
            movies.results.map(movie => (
              <Link to={`/movie/details/${movie.id}`} className='movie-item'>
                <div className='poster'>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt=''
                  />
                  <div className='rating'>
                    <p>{movie.vote_average}</p>
                    <i class='fas fa-star'></i>
                  </div>
                </div>
                <div className='movie-info'>
                  {' '}
                  <h3>{movie.title}</h3>
                  <p> {movie.genre_ids.map(id => helper(id)).join(' - ')}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  movies: state.movie.movie.MOVIE_BY_GENRE,
  loading: state.movie.loading.MOVIE_BY_GENRE
});

export default connect(
  mapStateToProps,
  { getMovieByGenre }
)(MovieList);
