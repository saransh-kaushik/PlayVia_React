import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaPlus, FaThumbsUp, FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: #181818;
  width: 850px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const ModalHeader = styled.div`
  position: relative;
  height: 400px;
  background-image: ${props => `linear-gradient(
    to bottom,
    transparent 60%,
    rgba(24, 24, 24, 0.8) 100%
  ), url(${props.bgImage})`};
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #181818;
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #404040;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 16px;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  color: #46d369;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: #fff;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  
  ${props => props.primary ? `
    background: white;
    color: black;
  ` : `
    background: rgba(109, 109, 110, 0.7);
    color: white;
  `}

  &:hover {
    opacity: 0.8;
  }
`;

const Details = styled.div`
  margin-top: 24px;
`;

const DetailRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  span:first-child {
    color: #777;
  }
`;

const MovieModal = ({ movie, onClose }) => {
  // Prevent closing when clicking inside the modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={handleContentClick}>
        <ModalHeader bgImage={movie.image || `https://picsum.photos/800/400?random=${movie.id}`}>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <Title>{movie.title || 'Movie Title'}</Title>
          
          <Stats>
            <span>98% Match</span>
            <span>2023</span>
            <span>2h 15m</span>
            <span>HD</span>
          </Stats>
          
          <ButtonGroup>
            <Button primary>
              <FaPlay /> Play
            </Button>
            <Button>
              <FaPlus /> My List
            </Button>
            <Button>
              <FaThumbsUp /> Rate
            </Button>
          </ButtonGroup>
          
          <Description>
            {movie.description || 'A compelling story that follows the journey of extraordinary characters in an unforgettable adventure. This groundbreaking film pushes the boundaries of storytelling and visual effects.'}
          </Description>
          
          <Details>
            <DetailRow>
              <span>Cast:</span>
              <span>Actor 1, Actor 2, Actor 3, Actor 4</span>
            </DetailRow>
            <DetailRow>
              <span>Genres:</span>
              <span>Action, Adventure, Drama</span>
            </DetailRow>
            <DetailRow>
              <span>Director:</span>
              <span>Director Name</span>
            </DetailRow>
          </Details>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieModal; 