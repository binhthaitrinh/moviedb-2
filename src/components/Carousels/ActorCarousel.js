import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Link } from "react-router-dom";

const ActorCarousel = ({ movieCredit }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const slider = new Swiper(swiperRef.current, {
      slidesPerView: 3,
      spaceBetween: 40,
      slidesPerGroup: 1,
      loop: true,
      loopFillGroupWithBlank: true,
      //   breakpoints: {
      //     1145: {
      //       slidesPerView: 3
      //     },
      //     699: {
      //       slidesPerView: 2
      //     }
      //   },
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true
      //   },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

    // return slider;
  });

  return (
    <div className="swiper-container actor-container" ref={swiperRef}>
      <div className="swiper-wrapper">
        {movieCredit.map(actor => (
          <Link
            to={`/`}
            key={actor.cast_id}
            className="swiper-slide"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w185${actor.profile_path})`
            }}
          >
            <div className="actor-info">
              <h1 className="actor-info-name">{actor.name}</h1>
              <p className="actor-info-title">{actor.character}</p>
            </div>
            <div className="overlay"></div>
          </Link>
        ))}
      </div>

      <div className="swiper-pagination" />

      <div className="swiper-button-next" />
      <div className="swiper-button-prev" />
    </div>
  );
};

export default ActorCarousel;
