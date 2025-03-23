import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaEdit, FaHeart, FaClock, FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: #141414;
  color: white;
  padding: 70px 4% 0;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 30px 0;
  border-bottom: 2px solid #333;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }

  svg {
    font-size: 100px;
    color: #666;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  svg {
    font-size: 40px;
    color: white;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 10px;
`;

const ProfileEmail = styled.p`
  color: #999;
  margin: 0 0 20px;
`;

const EditButton = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f40612;
    transform: scale(1.05);
  }

  svg {
    font-size: 18px;
  }
`;

const ContentSection = styled.section`
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #e50914;
  }
`;

const AccountInfo = styled.div`
  background: rgba(51, 51, 51, 0.5);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 30px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #404040;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const InfoLabel = styled.span`
  color: #999;
`;

const InfoValue = styled.span`
  color: white;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MovieCard = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);

    .movie-info {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const MovieTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
`;

const MovieDate = styled.span`
  color: #999;
  font-size: 14px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#fff' : '#999'};
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#e50914' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    color: white;
  }
`;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('myList');
  const { user } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  // Mock data - replace with actual data from your backend
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    membership: 'Premium',
    memberSince: 'January 2024',
    nextBilling: 'February 15, 2024',
    plan: 'Premium UHD',
  };

  const mockMovies = {
    myList: [
      { id: 1, title: 'Stranger Things', date: '2024', image: 'https://via.placeholder.com/200x300' },
      { id: 2, title: 'The Witcher', date: '2023', image: 'https://via.placeholder.com/200x300' },
      // Add more movies
    ],
    watched: [
      { id: 3, title: 'Breaking Bad', date: '2024', image: 'https://via.placeholder.com/200x300' },
      { id: 4, title: 'The Crown', date: '2023', image: 'https://via.placeholder.com/200x300' },
      // Add more movies
    ],
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage>
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <FaUserCircle />
          )}
          <ImageOverlay className="overlay">
            <label htmlFor="profile-upload">
              <FaEdit />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
          </ImageOverlay>
        </ProfileImage>

        <ProfileInfo>
          <ProfileName>{mockUser.name}</ProfileName>
          <ProfileEmail>{mockUser.email}</ProfileEmail>
          <EditButton>
            <FaEdit /> Edit Profile
          </EditButton>
        </ProfileInfo>
      </ProfileHeader>

      <ContentSection>
        <SectionTitle>
          <FaCheckCircle /> Account Information
        </SectionTitle>
        <AccountInfo>
          <InfoRow>
            <InfoLabel>Membership</InfoLabel>
            <InfoValue>{mockUser.membership}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Member Since</InfoLabel>
            <InfoValue>{mockUser.memberSince}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Next Billing Date</InfoLabel>
            <InfoValue>{mockUser.nextBilling}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Current Plan</InfoLabel>
            <InfoValue>{mockUser.plan}</InfoValue>
          </InfoRow>
        </AccountInfo>
      </ContentSection>

      <ContentSection>
        <TabContainer>
          <Tab 
            active={activeTab === 'myList'} 
            onClick={() => setActiveTab('myList')}
          >
            <FaHeart /> My List
          </Tab>
          <Tab 
            active={activeTab === 'watched'} 
            onClick={() => setActiveTab('watched')}
          >
            <FaClock /> Watch History
          </Tab>
        </TabContainer>

        <MovieGrid>
          {mockMovies[activeTab].map(movie => (
            <MovieCard key={movie.id}>
              <img src={movie.image} alt={movie.title} />
              <MovieInfo className="movie-info">
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieDate>{movie.date}</MovieDate>
              </MovieInfo>
            </MovieCard>
          ))}
        </MovieGrid>
      </ContentSection>
    </ProfileContainer>
  );
};

export default UserProfile;
