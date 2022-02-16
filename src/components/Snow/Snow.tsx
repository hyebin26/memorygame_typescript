import React from "react";
import styled, { keyframes } from "styled-components";

type SnowFlakesType = {
  random: number;
  delay: number;
};

const SnowFlakes = ({ random, delay }: SnowFlakesType) => {
  return (
    <Snow random={random} delay={delay}>
      {"\u2745"}
    </Snow>
  );
};

const makeSnowFlakes = () => {
  const arr = Array.from({ length: 40 });
  return arr.map((el, i) => {
    return (
      <SnowFlakes
        random={Math.floor(Math.random() * 10) + 10}
        delay={Math.round(Math.random() * 1000) / 80}
      />
    );
  });
};

const FallingSnow = () => {
  return (
    <SnowContainer>
      <SnowWrapper>{makeSnowFlakes()}</SnowWrapper>
    </SnowContainer>
  );
};

const fall = keyframes`
  0% {
    opacity: 0;
  };
  5% {
    opacity: 0.9;
  };
  50% {
    opacity: 0.9;
  };
  100% {
    transform: translate(0, 650px);
    opacity: 0;
  };
  `;

const SnowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SnowContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const Snow = styled.p<SnowFlakesType>`
  opacity: 0;
  font-size: ${(props) => props.random + "px"};
  animation: ${fall} 4s linear infinite;
  animation-delay: ${(props) => props.delay}s;
  color: white;
  height: 13px;
  @media screen and (max-width: 650px) {
    font-size: ${(props) => props.random - 5}px;
  }
`;

export default FallingSnow;
