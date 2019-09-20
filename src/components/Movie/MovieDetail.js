import React, { useEffect } from 'react';
import { getDetail } from '../../actions/movie';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';

const MovieDetail = ({ match, getDetail, details, loading }) => {
  useEffect(() => {
    getDetail(match.params.id);
  }, [getDetail]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <header id="header-detail">
        <div
          className="background-blur"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
          }}></div>
        <div
          className="background-main"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
          }}>
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w1280${details.poster_path}`}
              alt=""
            />

            <div className="header-movie-detail">
              <h1 className="header-movie-detail-title">{details.title}</h1>
              <p className="header-movie-detail-genre">
                {details.genres.map(genre => genre.name).join(' - ')}
              </p>
              <p className="header-movie-detail-desc">{details.overview}</p>
              <Link className="btn btn-primary">
                <p>Read more</p>
                <div className="overlay"></div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = state => ({
  details: state.movie.movie.GET_DETAIL,
  loading: state.movie.loading.GET_DETAIL
});

export default connect(
  mapStateToProps,
  { getDetail }
)(MovieDetail);
