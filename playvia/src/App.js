import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Row from './components/Row/Row';

const AppContainer = styled.div`
  background-color: #111;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  padding-top: 70px;
`;

function App() {
  return (
    <Router>
      <AppContainer>
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
      </AppContainer>
    </Router>
  );
}

export default App;
