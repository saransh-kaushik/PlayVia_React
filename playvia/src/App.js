/**
 * Main App component for PlayVia - A Video Streaming Platform
 * This component serves as the root of the application and handles routing
 * and authentication state management.
 */

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
import Payment from './components/Payment/Payment';
import PaymentGateway from './components/Payment/paymentGateway';

/**
 * Styled component for the main app container
 * Sets up the dark theme background and full viewport height layout
 */
const AppContainer = styled.div`
  background-color: #111;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

/**
 * Styled component for the main content area
 * Adds padding below the navbar and ensures content fills available space
 */
const ContentContainer = styled.div`
  padding-top: 70px;
  flex: 1;
`;

/**
 * ProtectedRoute Component
 * A higher-order component that checks for authentication
 * Redirects to login if user is not authenticated
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/**
 * Main App Component
 * Sets up the application structure with:
 * - Authentication context provider
 * - Routing configuration
 * - Protected routes for authenticated users
 * - Public routes for login/signup
 * - Main content layout with navbar, banner, movie rows, and footer
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/enter-otp" element={<EnterOTP />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-gateway" element={<PaymentGateway/>}/>
            
            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Protected User Profile Route */}
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
            
            {/* Protected Home Route with Movie Categories */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <ContentContainer>
                      <Banner />
                      {/* Movie category rows with different titles */}
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
