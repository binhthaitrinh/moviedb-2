import React, { useEffect } from 'react';
import {
  getDetail,
  getCredit,
  getTrailer,
  getReviews
} from '../../actions/movie';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';
import ActorCarousel from '../Carousels/ActorCarousel';

const MovieDetail = ({
  match,
  getDetail,
  details,
  loading,
  getCredit,
  credits,
  reviewLoading,
  reviews,
  creditLoading,
  getTrailer,
  trailers,
  trailerLoading,
  getReviews
}) => {
  useEffect(() => {
    getDetail(match.params.id, match.params.type);
    getCredit(match.params.id, match.params.type);
    getTrailer(match.params.id, match.params.type);
    getReviews(match.params.id, match.params.type);
  }, [getDetail, getCredit, getTrailer, getReviews, window.location.pathname]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <header id='header-detail'>
        <div
          className='background-blur'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
          }}
        ></div>
        <div
          className='background-main'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
          }}
        >
          <div className='movie-poster'>
            <img
              src={`https://image.tmdb.org/t/p/w1280${details.poster_path}`}
              alt=''
            />

            <div className='header-movie-detail'>
              <p className='header-movie-detail-release'>
                {details.tagline || 'No tagline found'}
              </p>
              <h1 className='header-movie-detail-title'>{details.title}</h1>

              <p className='header-movie-detail-genre'>
                {details.runtime +
                  ' min | ' +
                  details.genres.map(genre => genre.name).join(' - ')}
              </p>

              <Link className='btn btn-primary' to='/'>
                <p>Read more</p>
                <div className='overlay'></div>
              </Link>
            </div>
          </div>
        </div>

        <div className='header-bottom-detail'>
          <div className='header-bottom-detail-stats'>
            <div className='item'>
              <h4 className='title'>
                <span className='text-white'>{details.vote_average}</span>/10
              </h4>
              <p className='subtext'>{details.vote_count}</p>
            </div>
            <div className='item'>
              <h4 className='title'>Popularity</h4>
              <p className='subtext'>{details.popularity}</p>
            </div>
            <div className='item'>
              <h4 className='title'>Revenue</h4>
              <p className='subtext'>{details.revenue}</p>
            </div>
          </div>

          <ul className='header-bottom-detail-list'>
            <li className='item'>
              <Link to='/'>Full Cast and crew</Link>
            </li>
            <li className='item'>
              <Link to='/'>Trailer</Link>
            </li>
            <li className='item'>
              <Link to='/'>Overview</Link>
            </li>
          </ul>
        </div>
      </header>

      <div className='movie-details-body'>
        <div className='movie-details-body-poster'>
          <img
            src={`https://image.tmdb.org/t/p/w1280${details.poster_path}`}
            alt=''
          />
          <h4 className='title'>{details.title}</h4>
        </div>
        <div className='movie-details-body-content'>
          <div className='overview mb-3'>
            <h4 className='title'>Overview</h4>
            <p className='text-body my-1'>{details.overview}</p>
            <p className='text-body'>
              <span className='text-bold text-primary'>Produced by: </span>
              {details.production_companies
                .map(company => company.name)
                .join(', ')}
            </p>
            <p className='text-body'>
              <span className='text-bold text-primary'>Available in: </span>
              {details.spoken_languages
                ? details.spoken_languages
                    .map(language => language.name)
                    .join(', ')
                : details.languages.map(language => language.name).join(', ')}
            </p>
          </div>

          <div className='cast'>
            <h4 className='title'>Cast</h4>
            {creditLoading ? null : <ActorCarousel movieCredit={credits} />}
          </div>

          <div className='reviews'>
            <h4 className='title'>Reviews</h4>
            {reviewLoading
              ? null
              : reviews.map(review => (
                  <div className='review' key={review.id}>
                    <img
                      src='https://via.placeholder.com/300'
                      alt={review.author}
                    />
                    <div className='review-details'>
                      <h5 className='review-author'>{review.author}</h5>
                      <p className='review-content'>
                        {review.content
                          .split(' ')
                          .splice(0, 30)
                          .join(' ')}{' '}
                        <span>
                          {review.content.split(' ').length >= 30 ? '...' : ''}
                        </span>{' '}
                      </p>
                      <a
                        className='review-link'
                        href={review.url}
                        target='_blank'
                      >
                        Read more >>
                      </a>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className='movie-details-body-video'>
          <h4 className='title'>Videos</h4>
          {trailerLoading
            ? null
            : trailers.map(trailer => (
                <iframe
                  key={trailer.id}
                  title={trailer.name}
                  width='90%'
                  height='190'
                  style={{ marginTop: '2rem' }}
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  details: state.movie.movie.GET_DETAIL,
  loading: state.movie.loading.GET_DETAIL,
  creditLoading: state.movie.loading.GET_CREDIT,
  credits: state.movie.movie.GET_CREDIT,
  trailers: state.movie.movie.GET_TRAILER,
  trailerLoading: state.movie.loading.GET_TRAILER,
  reviewLoading: state.movie.loading.GET_REVIEWS,
  reviews: state.movie.movie.GET_REVIEWS
});

export default connect(
  mapStateToProps,
  { getDetail, getCredit, getTrailer, getReviews }
)(MovieDetail);
