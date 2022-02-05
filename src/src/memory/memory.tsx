import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemoryContent from "../MemoryContent/memoryContent";

function getRandomArbitrary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const Memory = () => {
  const random: number = getRandomArbitrary(0, 9);
  const [process, setProcess] = useState<number[]>([]);
  const contentArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const onClickStartBtn = () => {
    setProcess((prevState) => [...prevState, random]);
  };
  return (
    <MemorySection>
      <h2>Element</h2>
      <StartBtn onClick={onClickStartBtn}>start@</StartBtn>
      <MemoryContentWrapper>
        {contentArr.map((item, idx) => (
          <MemoryContent key={idx} contentId={idx} />
        ))}
      </MemoryContentWrapper>
    </MemorySection>
  );
};

const MemorySection = styled.section`
  width: 70%;
  margin: 0 auto;
  padding-top: 3rem;
`;

const StartBtn = styled.button`
  padding: 0.3rem;
  background: black;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

const MemoryContentWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Memory;
