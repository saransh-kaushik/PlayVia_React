import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaCamera } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #181818;
  border-radius: 6px;
  width: 100%;
  max-width: 500px;
  position: relative;
  padding: 30px;
  color: white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    color: #e50914;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 30px;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ProfileImagePreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    font-size: 40px;
    color: #666;
  }
`;

const ImageUploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #333;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #404040;
  }

  input {
    display: none;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #999;
  font-size: 14px;
`;

const Input = styled.input`
  background: #333;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0071eb;
    background: #454545;
  }
`;

const SaveButton = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;

  &:hover {
    background: #f40612;
    transform: scale(1.02);
  }

  &:disabled {
    background: #4d4d4d;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e87c03;
  font-size: 14px;
  margin-top: 8px;
`;

const EditProfileModal = ({ isOpen, onClose, currentUser, onSave }) => {
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    profileImage: currentUser.profileImage || null
  });
  const [previewImage, setPreviewImage] = useState(currentUser.profileImage || null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>

        <Title>Edit Profile</Title>

        <Form onSubmit={handleSubmit}>
          <ImageUploadContainer>
            <ProfileImagePreview>
              {previewImage ? (
                <img src={previewImage} alt="Profile Preview" />
              ) : (
                <FaCamera />
              )}
            </ProfileImagePreview>
            <ImageUploadButton>
              <FaCamera /> Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </ImageUploadButton>
          </ImageUploadContainer>

          <InputGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter your phone number"
            />
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SaveButton type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditProfileModal; 