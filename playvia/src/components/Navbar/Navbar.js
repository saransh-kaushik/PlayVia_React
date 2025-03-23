import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaBell, FaCaretDown, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

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

const ProfileDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  right: 0;
  background-color: #000;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
`;

const DropdownItem = styled.div`
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #333;
    border-radius: 4px;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #333;
  margin: 8px 0;
`;

const ProfileImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  svg {
    font-size: 20px;
    color: #666;
  }
`;

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    setShowDropdown(false);
    navigate('/profile');
  };

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
        <ProfileDropdown>
          <NavItem onClick={() => setShowDropdown(!showDropdown)}>
            <ProfileImage>
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" />
              ) : (
                <FaUser />
              )}
            </ProfileImage>
            <FaCaretDown />
          </NavItem>
          <DropdownContent show={showDropdown}>
            <DropdownItem onClick={handleProfile}>
              <FaUser /> Profile
            </DropdownItem>
            <Divider />
            <DropdownItem onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </DropdownItem>
          </DropdownContent>
        </ProfileDropdown>
      </NavItems>
    </Nav>
  );
};

export default Navbar; 