import React, { useState } from "react";
import styled from "styled-components";
import MemoryContent from "../MemoryContent/memoryContent";
import { content } from "./content";

function getRandomArbitrary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const USER = "Your Turn";
const WAIT = "기억력 게임!";
const GAME = "Gaming";

const Memory = () => {
  const [memory, setMemory] = useState(content);
  const [status, setStatus] = useState(WAIT);
  const [currentGame, setCurrentGame] = useState<number[]>([]);
  const [currentClicked, setCurrentClicked] = useState<number[]>([]);
  const onClickContent = (contentId: number) => {
    const audio = new Audio("./sound/MP_Blop.mp3");
    const syncCurrentClicked = [...currentClicked, contentId];
    const leng = syncCurrentClicked.length - 1;
    audio.play();
    setMemory((prev) => {
      return prev.map((item) => {
        if (item.contentId === contentId) {
          return { ...item, clicked: true };
        }
        return { ...item };
      });
    });
    if (status === USER) {
      if (currentGame[leng] === syncCurrentClicked[leng]) {
        if (currentGame.length === leng + 1) {
          handleRightAnswer();
          audio.pause();
        }
        if (currentGame.length !== leng + 1) {
          setCurrentClicked(syncCurrentClicked);
        }
      }
      if (currentGame[leng] !== syncCurrentClicked[leng]) {
        handleWrongAnswer();
        audio.pause();
      }
    }
  };

  const handleWrongAnswer = () => {
    const audio = new Audio("./sound/MP_Button.mp3");
    audio.play();
    setMemory(content);
    setCurrentGame([]);
    setCurrentClicked([]);
    setStatus(WAIT);
  };
  const handleRightAnswer = () => {
    handleGaming();
    const audio = new Audio("./sound/MP_swipe-whoosh.mp3");
    audio.play();
    setMemory((prev) => {
      return prev.map((item) => ({ ...item, target: true }));
    });
  };
  const onHandleEndAnimation = () => {
    setMemory(content);
  };
  const onClickStartBtn = () => {
    handleGaming();
  };
  const handleGaming = () => {
    const random = getRandomArbitrary(0, 9);
    const gaming = [...currentGame, random];
    setStatus(GAME);
    setCurrentGame([...currentGame, random]);
    setCurrentClicked([]);
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
        setStatus(USER);
        clearInterval(interval);
      }
    }, 1000);
  };
  return (
    <MemorySection>
      <h2>
        🤶 {status === GAME ? `${currentGame.length} Element` : status} 🎅
      </h2>
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
              key={item.contentId}
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
    margin: 1rem 0;
    background: blue;
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
