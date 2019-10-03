import {
  GET_TRENDING,
  GET_CREDIT,
  GET_DETAIL,
  GET_NOW_PLAYING,
  GET_POPULAR,
  GET_TOP_RATED,
  GET_TRAILER,
  MOVIE_ERROR,
  SET_LOADING,
  GET_REVIEWS
} from '../actions/types';

const initialState = {
  movie: {
    GET_TRENDING: null,
    GET_CREDIT: null,
    GET_DETAIL: null,
    GET_TOP_RATED: null,
    GET_NOW_PLAYING: null,
    GET_POPULAR: null,
    GET_TRAILER: null,
    GET_REVIEWS: null
  },

  loading: {
    [GET_TRENDING]: true,
    [GET_CREDIT]: true,
    [GET_DETAIL]: true,
    [GET_TOP_RATED]: true,
    [GET_NOW_PLAYING]: true,
    [GET_POPULAR]: true,
    [GET_TRAILER]: true,
    [GET_REVIEWS]: true,
    ['SEARCH_MOVIES']: true
  },

  errors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  let contentType = null;

  if (type !== MOVIE_ERROR && type !== '@@INIT' && type !== SET_LOADING) {
    contentType = type;
  }

  switch (type) {
    case MOVIE_ERROR:
      return {
        ...state,
        errors: [payload, ...state.errors]
      };
    case 'MOVIE_LOADING':
      return {
        ...state,
        loading: {
          ['GET_DETAIL']: true
        }
      };
    case contentType:
      return {
        ...state,
        movie: {
          ...state.movie,
          [contentType]: payload
        },
        loading: {
          ...state.loading,
          [contentType]: false
        }
      };
    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [GET_TOP_RATED]: true,
          [GET_NOW_PLAYING]: true,
          [GET_POPULAR]: true
        }
      };
    default:
      return state;
  }
}
