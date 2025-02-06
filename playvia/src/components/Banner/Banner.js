import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import MovieModal from '../MovieModal/MovieModal';

const BannerContainer = styled.header`
  background-image: ${props => `linear-gradient(
    to bottom,
    transparent 60%,
    rgba(0, 0, 0, 0.8) 100%
  ), url(${props.bgImage})`};
  background-size: cover;
  background-position: center center;
  color: white;
  height: 80vh;
  position: relative;
  object-fit: contain;
  padding: 0 60px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 30px;
    height: 70vh;
  }
`;

const BannerContent = styled.div`
  margin-left: 40px;
  padding-top: 140px;
  height: 190px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 100px;
  }
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerDescription = styled.h2`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 1.2rem;
  max-width: 80%;
  height: 80px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: auto;
    max-width: 100%;
  }
`;

const BannerButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  cursor: pointer;
  color: ${props => props.primary ? '#000' : '#fff'};
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding: 0.5rem 2rem;
  background-color: ${props => props.primary ? '#fff' : 'rgba(51, 51, 51, 0.5)'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const Banner = () => {
  const [showModal, setShowModal] = useState(false);

  // Sample featured movie data
  const featuredMovie = {
    id: 'featured',
    title: 'Featured Movie Title',
    image: 'https://picsum.photos/1920/1080?random=featured',
    description: 'This is a featured movie that showcases an epic story with stunning visuals and an amazing cast. Watch as the characters embark on an unforgettable journey.',
  };

  return (
    <>
      <BannerContainer bgImage={featuredMovie.image}>
        <BannerContent>
          <BannerTitle>{featuredMovie.title}</BannerTitle>
          <BannerDescription>
            {featuredMovie.description}
          </BannerDescription>
          <BannerButtons>
            <Button primary>
              <FaPlay /> Play
            </Button>
            <Button onClick={() => setShowModal(true)}>
              <FaInfoCircle /> More Info
            </Button>
          </BannerButtons>
        </BannerContent>
      </BannerContainer>

      {showModal && (
        <MovieModal
          movie={featuredMovie}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

hdjsfhjf
export default Banner; 