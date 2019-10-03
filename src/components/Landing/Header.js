import React, { useEffect, useState } from 'react';
import { useTransition, animated, config } from 'react-spring';
import { Link } from 'react-router-dom';
import { TvGenre, movieGenre } from '../../constants/Genre';
import InProgress from '../Layout/InProgress';

const Header = ({ movies }) => {
  const [index, set] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const transitions = useTransition(movies[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses
  });

  useEffect(() => {
    const changeImage = setInterval(() => {
      set(state => (state + 1) % movies.length);
    }, 6000);
    return () => clearInterval(changeImage);
  }, [movies]);

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
    <header id='header-home'>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          className='slideshow'
          style={{
            ...props,
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
          }}
        >
          <div className='hero-box-header'>
            <h3 className='genre'>
              {item.genre_ids.map(id => helper(id)).join(' - ')}
            </h3>
            <h1 className='title'>{item.title || item.name || 'Unknown'}</h1>
            <h3 className='showtime mb-2'>{item.release_date}</h3>
            <p className='overview mb-2'>{`${item.overview
              .split(' ')
              .splice(0, 60)
              .join(' ')}...`}</p>
            <div className='action-btn'>
              <Link
                to={`/${item.media_type}/details/${item.id}`}
                className='btn-primary mr-2'
              >
                <p>More info</p>
                <div className='overlay'></div>
              </Link>
              <Link
                to='/'
                className='btn-second'
                onClick={() => setShowModal(true)}
              >
                <p>Add to list</p>
                <div className='overlay'></div>
              </Link>
            </div>
          </div>
        </animated.div>
      ))}
      {/* <Modal
        className={`modal ${showModal ? 'show' : ''}`}
        title='Warning'
        content='This feature has not been published. Please be patient :)'
        onDismiss={() => {
          setShowModal(false);
        }}
        actions={closeAction}
      /> */}

      <InProgress showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
};

export default Header;
