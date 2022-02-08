import React, { useState } from "react";
import styled from "styled-components";
import MemoryContent from "../MemoryContent/memoryContent";
import { content } from "./content";

function getRandomArbitrary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

// 맞출 경우 currentGame에 랜덤 숫자 하나 더 추가
const Memory = () => {
  const [memory, setMemory] = useState(content);
  const [currentGame, setCurrentGame] = useState<number[]>([]);
  const [currentClicked, setCurrentClicked] = useState<number[]>([]);
  const onClickContent = (contentId: number) => {
    const syncCurrentClicked = [...currentClicked, contentId];
    const leng = syncCurrentClicked.length - 1;
    setMemory((prev) => {
      return prev.map((item) => {
        if (item.contentId === contentId) {
          return { ...item, clicked: true };
        }
        return { ...item };
      });
    });
    if (currentGame[leng] === syncCurrentClicked[leng]) {
      if (currentGame.length === leng + 1) {
        handleRightAnswer();
      }
      if (currentGame.length !== leng + 1) {
        setCurrentClicked(syncCurrentClicked);
      }
    }
    if (currentGame[leng] !== syncCurrentClicked[leng]) {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    // 틀렸을 경우
    alert("wrong");
  };
  const handleRightAnswer = () => {
    // currentGame에 하나 더 추가하고 clicked 초기화
    alert("Right");
  };
  const onHandleEndAnimation = () => {
    setMemory(content);
  };
  const onClickStartBtn = () => {
    handleGaming();
  };
  const handleGaming = () => {
    const gaming = [...currentGame, getRandomArbitrary(0, 9)];
    const interval = setInterval(() => {
      if (gaming.length) {
        const currentTarget = gaming.shift();
        setMemory((prev) => {
          return prev.map((item) => {
            return item.contentId === currentTarget
              ? { ...item, target: true }
              : { ...item };
          });
        });
      }
      if (!gaming.length) {
        clearInterval(interval);
      }
    }, 500);
  };
  return (
    <MemorySection>
      <h2>기억력게임!</h2>
      <button onClick={onClickStartBtn}>Start@</button>
      <MemoryContentWrapper>
        {memory.map((item) => {
          return (
            <MemoryContent
              기울기={item.inclination}
              contentId={item.contentId}
              clicked={item.clicked}
              onClickContent={onClickContent}
              onHandleEndAnimation={onHandleEndAnimation}
              target={item.target}
            />
          );
        })}
      </MemoryContentWrapper>
    </MemorySection>
  );
};

const MemorySection = styled.section`
  max-width: 600px;
  margin: 2rem auto;
  button {
    background: black;
    color: white;
    border: none;
    padding: 0.4rem;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const MemoryContentWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Memory;
