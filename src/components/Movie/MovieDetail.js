import React, { useEffect } from "react";
import { getDetail, getCredit } from "../../actions/movie";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import ActorCarousel from "../Carousels/ActorCarousel";

const MovieDetail = ({
  match,
  getDetail,
  details,
  loading,
  getCredit,
  credits,
  creditLoading
}) => {
  useEffect(() => {
    getDetail(match.params.id);
    getCredit(match.params.id);
  }, [getDetail, getCredit]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <header id="header-detail">
        <div
          className="background-blur"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
          }}
        ></div>
        <div
          className="background-main"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
          }}
        >
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w1280${details.poster_path}`}
              alt=""
            />

            <div className="header-movie-detail">
              <p className="header-movie-detail-release">
                {details.tagline || "No tagline found"}
              </p>
              <h1 className="header-movie-detail-title">{details.title}</h1>

              <p className="header-movie-detail-genre">
                {details.runtime +
                  " min | " +
                  details.genres.map(genre => genre.name).join(" - ")}
              </p>

              <Link className="btn btn-primary">
                <p>Read more</p>
                <div className="overlay"></div>
              </Link>
            </div>
          </div>
        </div>

        <div className="header-bottom-detail">
          <div className="header-bottom-detail-stats">
            <div className="item">
              <h4 className="title">
                <span className="text-white">{details.vote_average}</span>/10
              </h4>
              <p className="subtext">{details.vote_count}</p>
            </div>
            <div className="item">
              <h4 className="title">Popularity</h4>
              <p className="subtext">{details.popularity}</p>
            </div>
            <div className="item">
              <h4 className="title">Revenue</h4>
              <p className="subtext">{details.revenue}</p>
            </div>
          </div>

          <ul className="header-bottom-detail-list">
            <li className="item">
              <Link to="/">Full Cast and crew</Link>
            </li>
            <li className="item">
              <Link to="/">Trailer</Link>
            </li>
            <li className="item">
              <Link to="/">Overview</Link>
            </li>
          </ul>
        </div>
      </header>

      <div className="movie-details-body">
        <div className="movie-details-body-poster">
          <img
            src={`https://image.tmdb.org/t/p/w1280${details.poster_path}`}
            alt=""
          />
          <h4 className="title">{details.title}</h4>
        </div>
        <div className="movie-details-body-content">
          <div className="overview mb-3">
            <h4 className="title">Overview</h4>
            <p className="text-body my-1">{details.overview}</p>
            <p className="text-body">
              <span className="text-bold text-primary">Produced by: </span>
              {details.production_companies
                .map(company => company.name)
                .join(", ")}
            </p>
            <p className="text-body">
              <span className="text-bold text-primary">Available in: </span>
              {details.spoken_languages
                .map(language => language.name)
                .join(", ")}
            </p>
          </div>

          <div className="cast">
            {creditLoading ? null : <ActorCarousel movieCredit={credits} />}
          </div>
        </div>
        <div className="movie-details-body-video"></div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  details: state.movie.movie.GET_DETAIL,
  loading: state.movie.loading.GET_DETAIL,
  creditLoading: state.movie.loading.GET_CREDIT,
  credits: state.movie.movie.GET_CREDIT
});

export default connect(
  mapStateToProps,
  { getDetail, getCredit }
)(MovieDetail);
