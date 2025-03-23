import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import loginBG from '../../assets/loginBG.jpg';

const LoginContainer = styled.div`
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

const LoginBox = styled.div`
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

const LoginButton = styled.button`
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

const ErrorMessage = styled.div`
  color: #e87c03;
  margin-bottom: 16px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 4px;
`;

const SignUpText = styled.p`
  color: #737373;
  font-size: 16px;
  margin-top: 16px;

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

const RememberMeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #b3b3b3;
  font-size: 13px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const HelpLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter a valid email and password.');
      setLoading(false);
      return;
    }

    // Mock login success
    setTimeout(() => {
      login();
      navigate('/');
      setLoading(false);
    }, 1500);
  };

  return (
    <LoginContainer>
      <Header>
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          onClick={() => navigate('/')}
        />
      </Header>

      <LoginBox>
        <Title>Sign In</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputContainer>

          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </LoginButton>

          <RememberMeRow>
            <CheckboxContainer>
              <Checkbox type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </CheckboxContainer>
            <HelpLink href="#">Need help?</HelpLink>
          </RememberMeRow>
        </Form>

        <SignUpText>
          New to Netflix?
          <span onClick={() => navigate('/signup')}>Sign up now</span>
        </SignUpText>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
