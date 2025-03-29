import React from 'react';
import styled from 'styled-components';

const LogoText = styled.div`
  color: #e50914;
  font-size: ${props => props.size || '32px'};
  font-weight: 800;
  font-family: 'Arial Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.05);
  }

  span {
    color: white;
  }
`;

const Logo = ({ size, onClick }) => {
  return (
    <LogoText size={size} onClick={onClick}>
      Play<span>Via</span>
    </LogoText>
  );
};

export default Logo; 