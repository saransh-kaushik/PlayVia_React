import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loginBG from '../../assets/loginBG.jpg';
import Logo from '../Logo/Logo';

const ForgetContainer = styled.div`
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

const Header = styled.div`
  width: 100%;
  padding: 20px 60px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 20px 30px;
  }
`;

const LogoContainer = styled.div`
  padding: 5px 0;
`;

const ForgetBox = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 60px 68px 40px;
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 0 20px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  background: #333;
  border-radius: 4px;
  border: none;
  padding: 16px 20px;
  box-sizing: border-box;
  font-size: 16px;
  color: white;
  outline: none;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &:focus {
    background: #454545;
    border-color: #0071eb;
    box-shadow: 0 0 10px rgba(0, 113, 235, 0.3);
  }

  &::placeholder {
    color: #8c8c8c;
  }
`;

const ResetButton = styled.button`
  width: 100%;
  height: 50px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  margin: 24px 0 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #f40612;
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(229, 9, 20, 0.3);
  }

  &:disabled {
    background: #4d4d4d;
    cursor: not-allowed;
  }
`;

const BackToLogin = styled.div`
  text-align: center;
  margin-top: 16px;
  color: #737373;
  font-size: 16px;

  span {
    color: white;
    margin-left: 5px;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Subtitle = styled.p`
  color: #999;
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ErrorMessage = styled.div`
  color: #e87c03;
  margin-bottom: 16px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 4px;
`;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }

    try {
      // Mock password reset request
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Password reset link sent to your email!");
      navigate('/login');
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgetContainer>
      <Header>
        <LogoContainer>
          <Logo size="32px" onClick={() => navigate('/')} />
        </LogoContainer>
      </Header>

      <ForgetBox>
        <Title>Forgot Password</Title>
        <Subtitle>
          Enter your email address and we'll send you a link to reset your password.
        </Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleReset}>
          <InputContainer>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>

          <ResetButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </ResetButton>
        </Form>

        <BackToLogin>
          Remember your password?
          <span onClick={() => navigate('/login')}> Sign in now</span>
        </BackToLogin>
      </ForgetBox>
    </ForgetContainer>
  );
};

export default ForgetPassword;
