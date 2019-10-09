import React, { useState, useEffect } from 'react';
import { getMovieByGenre } from '../../actions/movie';
import { movieGenre } from '../../constants/Genre';
import { connect } from 'react-redux';
import SpinnerSm from '../Layout/SpinnerSm';
import { Link } from 'react-router-dom';
import store from '../../store';

const MovieList = ({ getMovieByGenre, movies, loading, match }) => {
  const [genre, setGenre] = useState('Comedy');

  useEffect(() => {
    store.dispatch({
      type: 'MOVIE_LOADING'
    });
    if (match.params.page) {
      getMovieByGenre(findGenreId(genre), match.params.page);
    } else {
      getMovieByGenre('35');
    }
  }, [getMovieByGenre, match.params.page]);

  useEffect(() => {
    setGenre(match.params.genre);
  }, [match.params.genre]);

  const helper = id => {
    let result = '';
    movieGenre.genres.forEach(genre => {
      if (genre.id === id) {
        result = genre.name;
      }
    });
    return result;
  };

  const findGenreId = name => {
    let result = '';
    movieGenre.genres.forEach(genre => {
      if (genre.name.toLowerCase() === name.toLowerCase()) {
        result = genre.id;
      }
    });
    return result;
  };
  const currentPage = parseInt(match.params.page) || 1;
  return (
    <div className='movie-list'>
      <div className='movie-list-container'>
        <h1 className='movie-list-title'>Movie list</h1>
        <p className='movie-list-subtext'>
          Browse through great collection of movies
        </p>

        <div className='genre-select'>
          <div className='main-selector'>
            <p>{genre.toUpperCase()}</p>

            <i className='fas fa-sort-down'></i>
          </div>
          <ul className='genre-choices'>
            {movieGenre.genres.map(genre => (
              <Link
                to={`/movies/all/${genre.name.toLowerCase()}`}
                key={genre.id}
                className='genre-choice'
                onClick={() => {
                  setGenre(genre.name);
                  getMovieByGenre(genre.id);
                }}
              >
                {genre.name}
              </Link>
            ))}
          </ul>
        </div>

        {loading ? (
          <SpinnerSm />
        ) : (
          <div className='movie-grid'>
            {movies.results.map(movie => (
              <Link
                to={`/movie/details/${movie.id}`}
                key={movie.id}
                className='movie-item'
              >
                <div className='poster'>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt=''
                  />
                  <div className='rating'>
                    <p>{movie.vote_average}</p>
                    <i className='fas fa-star'></i>
                  </div>
                </div>
                <div className='movie-info'>
                  {' '}
                  <h3>{movie.title}</h3>
                  <p> {movie.genre_ids.map(id => helper(id)).join(' - ')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* <div className='movie-grid'>
          {loading ? (
            <SpinnerSm />
          ) : (
            movies.results.map(movie => (
              <Link
                to={`/movie/details/${movie.id}`}
                key={movie.id}
                className='movie-item'
              >
                <div className='poster'>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt=''
                  />
                  <div className='rating'>
                    <p>{movie.vote_average}</p>
                    <i className='fas fa-star'></i>
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
        </div> */}

        <div className='pagination'>
          <Link
            onClick={e => {
              if (currentPage === 1) {
                e.preventDefault();
              }
            }}
            to={`/movies/all/${genre}page=${currentPage - 1}`}
            className={
              currentPage === 1 ? 'btn-second mr-2' : 'btn-primary mr-2'
            }
          >
            <p>Page {currentPage ? currentPage - 1 : '0'}</p>
            <div className='overlay'></div>
          </Link>
          <Link
            to={`/movies/all/${genre}/page=${currentPage + 1}`}
            className='btn-primary'
          >
            <p>Page {currentPage + 1}</p>
            <div className='overlay'></div>
          </Link>
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
