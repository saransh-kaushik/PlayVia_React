import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import loginBG from '../../assets/loginBG.jpg';
import Logo from '../Logo/Logo';

const OTPContainer = styled.div`
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

const OTPBox = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 60px 68px 40px;
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  max-width: 450px;
  width: 100%;
  margin: 20px auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 20px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #8c8c8c;
  font-size: 16px;
  margin-bottom: 28px;
`;

const EmailHighlight = styled.span`
  color: white;
  font-weight: 500;
`;

const OTPInputGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const OTPInput = styled.input`
  width: 50px;
  height: 50px;
  background: #333;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 24px;
  color: white;
  text-align: center;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0071eb;
    background: #454545;
    box-shadow: 0 0 10px rgba(0, 113, 235, 0.3);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const VerifyButton = styled.button`
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

const ResendLink = styled.button`
  background: none;
  border: none;
  color: #0071eb;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }

  &:disabled {
    color: #8c8c8c;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const Timer = styled.span`
  color: #8c8c8c;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: #e87c03;
  margin: 10px 0;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 4px;
`;

const EnterOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const email = location.state?.email || '';

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    // Mock OTP resend
    console.log('Resending OTP...');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const enteredOTP = otp.join('');
    if (enteredOTP.length !== 4) {
      setError('Please enter a valid OTP');
      setLoading(false);
      return;
    }

    // Mock OTP verification
    setTimeout(() => {
      if (enteredOTP === '1234') { // For demo purposes
        login();
        navigate('/');
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <OTPContainer>
      <Header>
        <LogoContainer>
          <Logo size="32px" onClick={() => navigate('/')} />
        </LogoContainer>
      </Header>

      <OTPBox>
        <Title>Enter Verification Code</Title>
        <Subtitle>
          We've sent a verification code to <EmailHighlight>{email}</EmailHighlight>
        </Subtitle>

        <form onSubmit={handleSubmit}>
          <OTPInputGroup>
            {otp.map((digit, index) => (
              <OTPInput
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoFocus={index === 0}
              />
            ))}
          </OTPInputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <VerifyButton type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </VerifyButton>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {timer > 0 ? (
              <Timer>Resend code in {timer}s</Timer>
            ) : (
              <ResendLink onClick={handleResendOTP}>Resend Code</ResendLink>
            )}
          </div>
        </form>
      </OTPBox>
    </OTPContainer>
  );
};

export default EnterOTP;
