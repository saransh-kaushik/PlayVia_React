import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import MovieModal from '../MovieModal/MovieModal';

const RowContainer = styled.div`
  color: white;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const RowTitle = styled.h2`
  margin-left: 40px;
`;

const MovieContainer = styled.div`
  position: relative;
  height: 200px;
  cursor: pointer;
  transition: transform 450ms;

  &:hover {
    transform: scale(1.08);
  }
`;

const MoviePoster = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;
`;

const CustomSwiper = styled(Swiper)`
  padding: 20px 40px;
  
  .swiper-button-prev,
  .swiper-button-next {
    color: white;
    
    &:after {
      font-size: 24px;
    }
  }
`;

const Row = ({ title, movies = [] }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Sample movie data - replace with actual data when available
  const sampleMovies = [1, 2, 3, 4, 5, 6, 7, 8].map(id => ({
    id,
    title: `Movie ${id}`,
    image: `https://picsum.photos/300/450?random=${id}`,
    description: `This is a sample description for Movie ${id}. Replace this with actual movie data.`
  }));

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <CustomSwiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={6}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10
          }
        }}
      >
        {sampleMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieContainer onClick={() => handleMovieClick(movie)}>
              <MoviePoster
                src={movie.image}
                alt={movie.title}
              />
            </MovieContainer>
          </SwiperSlide>
        ))}
      </CustomSwiper>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </RowContainer>
  );
};

export default Row; 
