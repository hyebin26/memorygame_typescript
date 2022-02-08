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
  const arr = Array.from("Merry Christmas");
  return arr.map((el, i) => {
    return (
      <SnowFlakes
        random={Math.floor(Math.random() * 10) + 10}
        delay={Math.random() * 16}
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
  }
  3% {
    opacity: 0.9;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    transform: translate(0, 70px);
    opacity: 0;
  }
  `;

const SnowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90%;
`;

const SnowContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
`;

const Snow = styled.p<SnowFlakesType>`
  font-size: ${(props) => props.random + "px"};
  animation-delay: 30s;
  animation: ${fall} 1s linear infinite;
  color: white;
`;

export default FallingSnow;
