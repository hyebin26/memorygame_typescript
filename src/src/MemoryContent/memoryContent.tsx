import React, { useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";

type ContentType = {
  기울기: string;
  contentId: number;
  clicked: boolean;
  onClickContent: (contentId: number) => void;
  onHandleEndAnimation: () => void;
  target: boolean;
};

type StyledContent = {
  기울기: string;
  clicked: boolean;
  target: boolean;
};

const MemoryContent = ({
  기울기,
  contentId,
  clicked,
  onClickContent,
  onHandleEndAnimation,
  target,
}: ContentType) => {
  const clickContent = (e: React.MouseEvent<HTMLElement>) => {
    onClickContent(contentId);
  };
  const handleEndAnimation = () => {
    onHandleEndAnimation();
  };
  return (
    <Content
      기울기={기울기}
      clicked={clicked}
      onClick={clickContent}
      onAnimationEnd={handleEndAnimation}
      target={target}
    ></Content>
  );
};

const changeColor = keyframes`
    0%{
        background:grey;
    }
    100%{
        background:white;
    }
`;

const clickColor = keyframes`
0%{
    background:grey;
}
100%{
    background:white;
}
`;

const Content = styled.li<StyledContent>`
  width: 170px;
  height: 150px;
  border: 1px solid black;
  margin: 1rem 0;
  ${(props) =>
    props.clicked
      ? css`
          animation: ${clickColor} 0.5s linear;
        `
      : ""};
  ${(props) =>
    props.target
      ? css`
          animation: ${changeColor} 0.5s linear;
        `
      : ""};
  ${(props) =>
    props.기울기 === "많이 기울기" ? "transform: skewx(10deg);" : ""};
  ${(props) =>
    props.기울기 === "살짝 기울기" ? "transform: skewx(-4deg);" : ""};
`;

export default MemoryContent;
