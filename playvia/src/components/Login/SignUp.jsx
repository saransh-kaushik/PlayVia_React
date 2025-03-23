import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import loginBG from '../../assets/loginBG.jpg';

const SignUpContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.8) 100%
  ), url(${loginBG});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.7)
    );
    z-index: 1;
  }
`;

const SignUpHeader = styled.div`
  width: 100%;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 20px 30px;
  }
`;

const Logo = styled.img`
  width: 150px;
  cursor: pointer;
  filter: brightness(1.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const SignInButton = styled.button`
  background-color: #e50914;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f40612;
    transform: scale(1.05);
  }
`;

const SignUpContent = styled.div`
  max-width: 950px;
  padding: 75px 0;
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
  margin: 0 20px;
`;

const Title = styled.h1`
  font-size: 3.125rem;
  margin: 0 0 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.625rem;
  margin: 0 0 30px;
  font-weight: 400;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const Text = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 20px;
  font-weight: 400;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 750px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  height: 60px;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(22, 22, 22, 0.7);
  color: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0071eb;
    background: rgba(22, 22, 22, 0.9);
    box-shadow: 0 0 10px rgba(0, 113, 235, 0.3);
  }

  &::placeholder {
    color: #8c8c8c;
  }
`;

const GetStartedButton = styled.button`
  background-color: #e50914;
  color: white;
  padding: 20px 32px;
  border: none;
  border-radius: 4px;
  font-size: 1.625rem;
  font-weight: 500;
  cursor: pointer;
  min-height: 60px;
  transition: all 0.2s ease;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #f40612;
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(229, 9, 20, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px 24px;
  }
`;

const ErrorMessage = styled.div`
  color: #e87c03;
  margin-top: 10px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  text-align: left;
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Mock signup process
    setTimeout(() => {
      // Navigate to OTP page with email
      navigate('/enter-otp', { state: { email } });
      setLoading(false);
    }, 1500);
  };

  return (
    <SignUpContainer>
      <SignUpHeader>
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          onClick={() => navigate('/')}
        />
        <SignInButton onClick={() => navigate('/login')}>Sign In</SignInButton>
      </SignUpHeader>

      <SignUpContent>
        <Title>Unlimited movies, TV shows, and more</Title>
        <Subtitle>Watch anywhere. Cancel anytime.</Subtitle>
        <Text>Ready to watch? Enter your email to create or restart your membership.</Text>

        <SignUpForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputGroup>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <GetStartedButton type="submit" disabled={loading}>
              {loading ? 'Please wait...' : 'Get Started'}
            </GetStartedButton>
          </InputGroup>
        </SignUpForm>
      </SignUpContent>
    </SignUpContainer>
  );
};

export default SignUp;
