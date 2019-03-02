import React from "react";
import styled from "styled-components/macro";
import HomeMainSection from "./MainSection";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;

  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

const Home = () => (
  <Wrapper>
    <HomeMainSection />
  </Wrapper>
);

export default Home;
