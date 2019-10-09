import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Downshift, { resetIdCounter } from 'downshift';
import debounce from 'lodash.debounce';
import { searchMovies } from '../../actions/movie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../../store';
import InProgress from '../Layout/InProgress';

const Navbar = ({ searchMovies, searchResult, loading, history }) => {
  const onSearchSubmit = debounce(e => {
    searchMovies(e.target.value);
  }, 350);

  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState('current');
  function routeToItem(item) {
    store.dispatch({
      type: 'MOVIE_LOADING'
    });
    history.push(`/movie/details/${item.id}`);
  }

  const menuRef = useRef(null);

  const handleClick = e => {
    console.log(e.bubbles);
    Array.from(menuRef.current.children).forEach(child => {
      return child.classList.remove('current');
    });
    e.currentTarget.classList.add('current');
  };
  resetIdCounter();
  return (
    <div className='navbar'>
      <div className='container'>
        <nav className='menu'>
          <div className='menu-left'>
            <Link to='/'>
              <h2 className='menu-logo'>movieDB</h2>
            </Link>

            <ul className='menu-nav' ref={menuRef}>
              <li className='nav-item current' onClick={e => handleClick(e)}>
                <Link to='/' className='nav-link '>
                  Home
                </Link>
              </li>
              <li className='nav-item' onClick={e => handleClick(e)}>
                <Link to='/movies/all/comedy' className='nav-link'>
                  Movies
                </Link>
              </li>
              <li className='nav-item' onClick={e => handleClick(e)}>
                <Link to='/' className='nav-link'>
                  TV Shows
                </Link>
              </li>
              <li className='nav-item' onClick={e => handleClick(e)}>
                <Link to='/' className='nav-link'>
                  Discover
                </Link>
              </li>
            </ul>
          </div>

          <div className='menu-right'>
            <form action=''>
              <Downshift
                onChange={routeToItem}
                itemToString={item => (item === null ? '' : item.title)}
              >
                {({
                  getInputProps,
                  getItemProps,
                  isOpen,
                  inputValue,
                  highlightedIndex
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        type: 'text',
                        placeholder: 'Enter a movie name',
                        className: 'menu-right-search-bar',
                        onChange: e => {
                          e.persist();
                          onSearchSubmit(e);
                        }
                      })}
                    />
                    {isOpen && (
                      <div className='result-container'>
                        {loading
                          ? null
                          : searchResult.map((item, index) => (
                              <Link
                                to={`/movie/details/${item.id}`}
                                {...getItemProps({ item })}
                                className={
                                  index === highlightedIndex
                                    ? 'result-item highlighted'
                                    : 'result-item'
                                }
                                key={item.id}
                              >
                                <img
                                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                  alt='icon'
                                />
                                <div className='result-item-detail'>
                                  <h4>
                                    {item.title ||
                                      item.name ||
                                      'Title not available'}
                                  </h4>
                                </div>
                              </Link>
                              // <li {...getItemProps({ item })} key={item.id}>
                              //   {item.title}
                              // </li>
                            ))}
                        {loading
                          ? null
                          : searchResult.length >= 4 && (
                              <Link
                                to={`/search/q=${inputValue}`}
                                className='see-more'
                              >
                                See more...
                              </Link>
                            )}
                        {loading
                          ? null
                          : !searchResult.length && (
                              <div className='result-item'>
                                Nothing found {inputValue}{' '}
                              </div>
                            )}
                      </div>
                    )}
                  </div>
                )}
              </Downshift>

              <button className='menu-right-search-btn'>
                {' '}
                <i className='fas fa-search'></i>
              </button>
            </form>
            <div
              onClick={() => setShowModal(true)}
              className='menu-right-user-placeholder'
            ></div>
          </div>
        </nav>
      </div>

      <InProgress showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

const mapStateToProps = state => ({
  searchResult: state.movie.movie.SEARCH_MOVIES,
  loading: state.movie.loading.SEARCH_MOVIES
});

export default connect(
  mapStateToProps,
  { searchMovies }
)(withRouter(Navbar));
