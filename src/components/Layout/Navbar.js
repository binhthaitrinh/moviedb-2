import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Downshift, { resetIdCounter } from 'downshift';
import debounce from 'lodash.debounce';
import { searchMovies } from '../../actions/movie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../../store';
import InProgress from '../Layout/InProgress';

const links = [
  {
    url: '/',
    title: 'Home'
  },
  {
    url: '/movie/all/comedy',
    title: 'Movies'
  },
  {
    url: '/tv/all/comedy',
    title: 'Tv Shows'
  }
];

const Navbar = ({ searchMovies, searchResult, loading, history }) => {
  const onSearchSubmit = debounce(e => {
    searchMovies(e.target.value, 5);
  }, 350);

  const [current, setCurrent] = useState(window.location.pathname);

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [window.location.pathname]);

  const [showModal, setShowModal] = useState(false);

  function routeToItem(item) {
    store.dispatch({
      type: 'MOVIE_LOADING'
    });
    history.push(`/movie/details/${item.id}`);
  }

  // const menuRef = useRef(null);

  // const handleClick = e => {
  //   console.log(e.bubbles);
  //   Array.from(menuRef.current.children).forEach(child => {
  //     return child.classList.remove('current');
  //   });
  //   e.currentTarget.classList.add('current');
  // };
  resetIdCounter();
  return (
    <div className='navbar'>
      <div className='container'>
        <nav className='menu'>
          <div className='menu-left'>
            <Link to='/'>
              <h2 className='menu-logo'>movieDB</h2>
            </Link>

            <ul className='menu-nav'>
              {links.map((link, index) => (
                <li
                  className={
                    current === link.url ? 'nav-item current' : 'nav-item'
                  }
                  // onClick={e => handleClick(e)}
                  key={index}
                >
                  <Link to={link.url} className='nav-link'>
                    {link.title}
                  </Link>
                </li>
              ))}
              {/* <li className='nav-item current' onClick={e => handleClick(e)}>
                <Link to='/' className='nav-link '>
                  Home
                </Link>
              </li>
              <li className='nav-item' onClick={e => handleClick(e)}>
                <Link to='/movie/all/comedy' className='nav-link'>
                  Movies
                </Link>
              </li>
              <li className='nav-item' onClick={e => handleClick(e)}>
                <Link to='/tv/all/comedy' className='nav-link'>
                  TV Shows
                </Link>
              </li> */}
            </ul>
          </div>

          <div className='menu-right'>
            <Downshift
              onChange={routeToItem}
              itemToString={item => (item === null ? '' : item.title)}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
                closeMenu
              }) => (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    history.push(`/search/q=${inputValue}`);
                    closeMenu();
                    inputValue = '';
                  }}
                >
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
                  <button className='menu-right-search-btn'>
                    {' '}
                    <i className='fas fa-search'></i>
                  </button>
                </form>
              )}
            </Downshift>

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
  searchResult: state.movie.movie.SEARCH_MOVIES_SHORT,
  loading: state.movie.loading.SEARCH_MOVIES_SHORT
});

export default connect(
  mapStateToProps,
  { searchMovies }
)(withRouter(Navbar));
