import axios from "axios";
import {
  GET_TRENDING,
  GET_CREDIT,
  GET_DETAIL,
  GET_NOW_PLAYING,
  GET_POPULAR,
  GET_TOP_RATED,
  GET_TRAILER,
  MOVIE_ERROR
} from "./types";

import { API_KEY, PATH_BASE } from "../constants/movieDB";

const config = {
  headers: null
};

export const getTrending = () => async dispatch => {
  try {
    const res = await axios.get(
      `${PATH_BASE}/trending/all/day?api_key=${API_KEY}`
    );

    dispatch({
      type: GET_TRENDING,
      payload: res.data.results
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: MOVIE_ERROR,
      payload: {
        type: GET_TRENDING,
        error: err.response.data.status_message
      }
    });
  }
};

export const getNowPlaying = (type = "movie") => async dispatch => {
  let res = null;
  try {
    if (type === "movie") {
      res = await axios.get(
        `${PATH_BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
    } else {
      res = await axios.get(
        `${PATH_BASE}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
      );
    }
    setTimeout(() => {
      dispatch({
        type: GET_NOW_PLAYING,
        payload: res.data.results
      });
    }, 500);
  } catch (err) {
    dispatch({
      type: MOVIE_ERROR,
      payload: GET_NOW_PLAYING,
      error: err.response.data.status_message
    });
  }
};

export const getPopular = (type = "movie") => async dispatch => {
  let res = null;
  try {
    if (type === "movie") {
      res = await axios.get(
        `${PATH_BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
    } else {
      res = await axios.get(
        `${PATH_BASE}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
    }
    setTimeout(() => {
      dispatch({
        type: GET_POPULAR,
        payload: res.data.results
      });
    }, 500);
  } catch (err) {
    dispatch({
      type: MOVIE_ERROR,
      payload: GET_POPULAR,
      error: err.response.data.status_message
    });
  }
};

export const getTopRated = (type = "movie") => async dispatch => {
  let res = null;
  try {
    if (type === "movie") {
      res = await axios.get(
        `${PATH_BASE}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
    } else {
      res = await axios.get(
        `${PATH_BASE}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
    }
    setTimeout(() => {
      dispatch({
        type: GET_TOP_RATED,
        payload: res.data.results
      });
    }, 500);
  } catch (err) {
    dispatch({
      type: MOVIE_ERROR,
      payload: GET_TOP_RATED,
      error: err.response.data.status_message
    });
  }
};

export const getDetail = (id, type = "movie") => async dispatch => {
  try {
    const res = await axios.get(
      `${PATH_BASE}/${type}/${id}?api_key=${API_KEY}&language=en-US`
    );

    dispatch({
      type: GET_DETAIL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MOVIE_ERROR,
      payload: GET_DETAIL,
      error: err.response.data.status_message
    });
  }
};

export const getCredit = (id, type = "movie") => async dispatch => {
  try {
    const res = await axios.get(
      `${PATH_BASE}/${type}/${id}/credits?api_key=${API_KEY}`
    );

    dispatch({
      type: GET_CREDIT,
      payload: res.data.cast
    });
  } catch (err) {}
};
