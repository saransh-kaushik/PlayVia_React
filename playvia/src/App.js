import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Row from './components/Row/Row';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import EnterOTP from './components/Login/EnterOTP';
import UserProfile from './components/UserProfile/userProfile';
import Footer from './components/Footer/Footer';
import ForgetPassword from './components/Forget/forget';
import AdminDashboard from './admin/admin';
import { AuthContext, AuthProvider } from './context/AuthContext';

const AppContainer = styled.div`
  background-color: #111;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  padding-top: 70px;
  flex: 1;
`;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/enter-otp" element={<EnterOTP />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route
  path="/admin"
  element={
    <ProtectedRoute isAdmin>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <UserProfile />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <ContentContainer>
                      <Banner />
                      <Row title="Trending Now" />
                      <Row title="Top Rated" />
                      <Row title="Action Movies" />
                      <Row title="Comedy Movies" />
                      <Row title="Horror Movies" />
                      <Row title="Romance Movies" />
                      <Row title="Documentaries" />
                    </ContentContainer>
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppContainer>
      </Router>
    </AuthProvider>
  );
}

export default App;
