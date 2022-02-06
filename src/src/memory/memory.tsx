import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemoryContent from "../MemoryContent/memoryContent";

function getRandomArbitrary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const Memory = () => {
  const random: number = getRandomArbitrary(0, 9);
  const [game, setGame] = useState<number[]>([random]);
  const [status, setStatus] = useState("waiting");
  const [current, setCurrent] = useState<null | number | undefined>(null);
  const contentArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const onClickStartBtn = () => {
    setStatus("gaming");
    setGame((prevState) => [...prevState, random]);
  };

  const handleGaming = () => {
    const currentTarget = game.shift();
    setCurrent(currentTarget);
  };

  const onClickContent = (): void => {};
  useEffect(() => {
    if (status === "gaming") {
      handleGaming();
    }
  }, [status]);
  // start -> process값이 변함 => process 에서
  return (
    <MemorySection>
      <h2>Element</h2>
      <StartBtn onClick={onClickStartBtn}>start@</StartBtn>
      <MemoryContentWrapper>
        {contentArr.map((item, idx) => (
          <MemoryContent
            key={idx}
            contentId={idx}
            current={current ? current : null}
          />
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
