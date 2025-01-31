import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaBell, FaCaretDown } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background: ${props => props.show ? '#000' : 'transparent'};
  z-index: 100;
  transition: all 0.5s ease-in;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 0 30px;
  }
`;

const Logo = styled.img`
  width: 100px;
  object-fit: contain;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  color: white;
  margin-left: 20px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    opacity: 0.8;
  }
`;

const Navbar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <Nav show={show}>
      <Link to="/">
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </Link>
      <NavItems>
        <NavItem>
          <FaSearch />
        </NavItem>
        <NavItem>
          <FaBell />
        </NavItem>
        <NavItem>
          Profile <FaCaretDown />
        </NavItem>
      </NavItems>
    </Nav>
  );
};

export default Navbar; 