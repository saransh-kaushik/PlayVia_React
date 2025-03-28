import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FaUsers, FaFilm, FaChartBar, FaUpload, FaEdit, FaTrash, FaSearch, FaCloudUploadAlt, FaImage } from 'react-icons/fa';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: #141414;
  color: white;
  display: flex;
`;

const Sidebar = styled.div`
  width: 240px;
  background: #000000;
  padding: 20px;
  position: fixed;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 40px;
`;

const MenuItem = styled.div`
  padding: 12px 20px;
  margin: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  background: ${props => props.active ? '#e50914' : 'transparent'};

  &:hover {
    background: ${props => props.active ? '#e50914' : '#333'};
  }

  svg {
    font-size: 20px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 240px;
  padding: 30px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(51, 51, 51, 0.7);
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatTitle = styled.h3`
  font-size: 16px;
  color: #999;
  margin-bottom: 10px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #e50914;
`;

const ContentSection = styled.div`
  background: rgba(51, 51, 51, 0.7);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
  color: #999;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #333;
`;

const ActionButton = styled.button`
  background: ${props => props.danger ? '#dc3545' : '#0071eb'};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px ${props => props.danger ? 'rgba(220, 53, 69, 0.5)' : 'rgba(0, 113, 235, 0.5)'};
  }
`;

const UploadForm = styled.form`
  display: grid;
  gap: 20px;
  max-width: 600px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #333;
  border: 1px solid #444;
  border-radius: 4px;
  color: white;
  outline: none;

  &:focus {
    border-color: #0071eb;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background: #333;
  border: 1px solid #444;
  border-radius: 4px;
  color: white;
  outline: none;

  &:focus {
    border-color: #0071eb;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled(Input)`
  max-width: 300px;
`;

const DragDropZone = styled.div`
  width: 100%;
  min-height: 200px;
  border: 2px dashed ${props => props.isDragging ? '#e50914' : '#666'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: ${props => props.isDragging ? 'rgba(229, 9, 20, 0.1)' : 'rgba(0, 0, 0, 0.2)'};
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    border-color: #e50914;
    background: rgba(229, 9, 20, 0.1);
  }

  svg {
    font-size: 48px;
    color: ${props => props.isDragging ? '#e50914' : '#666'};
    margin-bottom: 16px;
  }
`;

const UploadText = styled.div`
  text-align: center;
  color: #999;

  span {
    color: #e50914;
    text-decoration: underline;
  }
`;

const PreviewContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const FilePreview = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  svg {
    font-size: 24px;
    margin-right: 12px;
    color: #e50914;
  }
`;

const PreviewInfo = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  color: white;
  margin-bottom: 4px;
`;

const FileSize = styled.div`
  color: #999;
  font-size: 12px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #e50914;
  }
`;

const ThumbnailPreview = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  background: #000;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 48px;
    color: #666;
  }
`;

const ErrorText = styled.div`
  color: #e50914;
  font-size: 14px;
  margin-top: 8px;
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [movieFile, setMovieFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploadError, setUploadError] = useState('');

  // Mock data
  const stats = {
    activeUsers: 1234,
    totalMovies: 567,
    categories: 8,
    newUsersToday: 45
  };

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Premium', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Standard', joinDate: '2024-02-01' },
    // Add more users
  ];

  const movies = [
    { id: 1, title: 'Stranger Things', category: 'TV Shows', views: 10500, uploadDate: '2024-01-10' },
    { id: 2, title: 'The Witcher', category: 'TV Shows', views: 8900, uploadDate: '2024-02-05' },
    // Add more movies
  ];

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file, type) => {
    const maxSize = 1024 * 1024 * 1000; // 1GB for videos
    const maxImageSize = 1024 * 1024 * 5; // 5MB for images

    if (type === 'video') {
      if (!file.type.startsWith('video/')) {
        setUploadError('Please upload a valid video file');
        return false;
      }
      if (file.size > maxSize) {
        setUploadError('Video file size should be less than 1GB');
        return false;
      }
    } else if (type === 'image') {
      if (!file.type.startsWith('image/')) {
        setUploadError('Please upload a valid image file');
        return false;
      }
      if (file.size > maxImageSize) {
        setUploadError('Image file size should be less than 5MB');
        return false;
      }
    }
    return true;
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setUploadError('');

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (validateFile(file, type)) {
      if (type === 'video') {
        setMovieFile(file);
      } else {
        setThumbnailFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (e, type) => {
    setUploadError('');
    const file = e.target.files[0];
    if (!file) return;

    if (validateFile(file, type)) {
      if (type === 'video') {
        setMovieFile(file);
      } else {
        setThumbnailFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeFile = (type) => {
    if (type === 'video') {
      setMovieFile(null);
    } else {
      setThumbnailFile(null);
      setThumbnailPreview(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardGrid>
              <StatCard>
                <StatTitle>Active Users</StatTitle>
                <StatValue>{stats.activeUsers}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Total Movies</StatTitle>
                <StatValue>{stats.totalMovies}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Categories</StatTitle>
                <StatValue>{stats.categories}</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>New Users Today</StatTitle>
                <StatValue>{stats.newUsersToday}</StatValue>
              </StatCard>
            </DashboardGrid>

            <ContentSection>
              <SectionTitle><FaChartBar /> Recent Activity</SectionTitle>
              {/* Add charts or activity feed here */}
            </ContentSection>
          </>
        );

      case 'users':
        return (
          <ContentSection>
            <SectionTitle><FaUsers /> User Management</SectionTitle>
            <SearchBar>
              <SearchInput 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Plan</Th>
                  <Th>Join Date</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.plan}</Td>
                    <Td>{user.joinDate}</Td>
                    <Td>
                      <ActionButton><FaEdit /> Edit</ActionButton>
                      <ActionButton danger><FaTrash /> Delete</ActionButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ContentSection>
        );

      case 'movies':
        return (
          <ContentSection>
            <SectionTitle><FaFilm /> Movie Management</SectionTitle>
            <SearchBar>
              <SearchInput 
                type="text" 
                placeholder="Search movies..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            <Table>
              <thead>
                <tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Views</Th>
                  <Th>Upload Date</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie.id}>
                    <Td>{movie.title}</Td>
                    <Td>{movie.category}</Td>
                    <Td>{movie.views}</Td>
                    <Td>{movie.uploadDate}</Td>
                    <Td>
                      <ActionButton><FaEdit /> Edit</ActionButton>
                      <ActionButton danger><FaTrash /> Delete</ActionButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ContentSection>
        );

      case 'upload':
        return (
          <ContentSection>
            <SectionTitle><FaUpload /> Upload Movie</SectionTitle>
            <UploadForm>
              <Input type="text" placeholder="Movie Title" />
              <Select>
                <option value="">Select Category</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="horror">Horror</option>
                <option value="tvshows">TV Shows</option>
              </Select>
              <Input type="text" placeholder="Description" />
              <Input type="text" placeholder="Duration (minutes)" />
              <Input type="text" placeholder="Release Year" />

              <DragDropZone
                isDragging={isDragging}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'video')}
                onClick={() => document.getElementById('movie-upload').click()}
              >
                <FaCloudUploadAlt />
                <UploadText>
                  Drag and drop your movie file here or <span>browse</span>
                  <div style={{ fontSize: '12px', marginTop: '8px' }}>
                    Supports: MP4, MKV, AVI (max 1GB)
                  </div>
                </UploadText>
                <input
                  id="movie-upload"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileSelect(e, 'video')}
                  style={{ display: 'none' }}
                />
              </DragDropZone>

              {movieFile && (
                <PreviewContainer>
                  <FilePreview>
                    <FaFilm />
                    <PreviewInfo>
                      <FileName>{movieFile.name}</FileName>
                      <FileSize>{formatFileSize(movieFile.size)}</FileSize>
                    </PreviewInfo>
                    <RemoveButton onClick={() => removeFile('video')}>
                      <FaTrash />
                    </RemoveButton>
                  </FilePreview>
                </PreviewContainer>
              )}

              <DragDropZone
                isDragging={isDragging}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'image')}
                onClick={() => document.getElementById('thumbnail-upload').click()}
              >
                <FaImage />
                <UploadText>
                  Drag and drop your thumbnail here or <span>browse</span>
                  <div style={{ fontSize: '12px', marginTop: '8px' }}>
                    Supports: JPG, PNG (max 5MB)
                  </div>
                </UploadText>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, 'image')}
                  style={{ display: 'none' }}
                />
              </DragDropZone>

              {thumbnailFile && (
                <ThumbnailPreview>
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="Thumbnail preview" />
                  ) : (
                    <FaImage />
                  )}
                </ThumbnailPreview>
              )}

              {uploadError && <ErrorText>{uploadError}</ErrorText>}

              <ActionButton type="submit">
                <FaUpload /> Upload Movie
              </ActionButton>
            </UploadForm>
          </ContentSection>
        );

      default:
        return null;
    }
  };

  return (
    <AdminContainer>
      <Sidebar>
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
        />
        <MenuItem 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        >
          <FaChartBar /> Dashboard
        </MenuItem>
        <MenuItem 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          <FaUsers /> Users
        </MenuItem>
        <MenuItem 
          active={activeTab === 'movies'} 
          onClick={() => setActiveTab('movies')}
        >
          <FaFilm /> Movies
        </MenuItem>
        <MenuItem 
          active={activeTab === 'upload'} 
          onClick={() => setActiveTab('upload')}
        >
          <FaUpload /> Upload Movie
        </MenuItem>
      </Sidebar>
      <MainContent>
        {renderContent()}
      </MainContent>
    </AdminContainer>
  );
};

export default AdminDashboard;