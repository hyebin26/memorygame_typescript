import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemoryContent from "../MemoryContent/memoryContent";

function getRandomArbitrary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const Memory = () => {
  const random: number = getRandomArbitrary(0, 9);
  const [game, setGame] = useState<number[]>([]);
  const [clicked, setClicked] = useState<number[]>([]);
  const [status, setStatus] = useState("기억력 게임!");
  const [current, setCurrent] = useState<null | number | undefined>(null);
  const contentArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const onClickStartBtn = () => {
    setStatus("gaming");
    setGame([random]);
  };
  useEffect(() => {
    if (status === "gaming") {
      const currentGame = [...game];
      const interval = setInterval(() => {
        if (currentGame.length) {
          setCurrent(currentGame.shift());
        }
        if (!currentGame.length) {
          setStatus("Your Turn");
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [status]);

  const onClickContent = (id: number): void => {
    setClicked((prev) => [...prev, id]);
    const currentClicked = [...clicked, id];
    if (currentClicked.length === game.length) {
      if (JSON.stringify(currentClicked) === JSON.stringify(game)) {
        handleRightAnswer();
        return;
      }
      handleWrongAnswer();
    }
    if (currentClicked.length > game.length) {
      handleWrongAnswer();
    }
  };

  const handleRightAnswer = (): void => {
    setGame((prev) => [...prev, random]);
    setStatus("gaming");
    setClicked([]);
    setCurrent(null);
  };

  const handleWrongAnswer = () => {
    setGame([getRandomArbitrary(0, 9)]);
    setClicked([]);
    setStatus("기억력 게임!");
  };
  return (
    <MemorySection>
      <h2>{status === "gaming" ? game.length + " Element" : status}</h2>
      <StartBtn onClick={onClickStartBtn}>Start@</StartBtn>
      <MemoryContentWrapper>
        {contentArr.map((item, idx) => (
          <MemoryContent
            key={idx}
            contentId={idx}
            current={current === null ? null : current}
            onClickContent={onClickContent}
          />
        ))}
      </MemoryContentWrapper>
    </MemorySection>
  );
};

const MemorySection = styled.section`
  max-width: 550px;
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
