import React from "react";
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
  const clickContent = () => {
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

const rotate = keyframes`
 0%{
   transform: rotate(0);
   background:white;
 }
 100%{
  transform:rotate(360deg);
  background:black;
 }
`;

const changeColor = keyframes`
    0%{
        background:grey;
    }
    100%{
        background:black;
    }
`;

const clickColor = keyframes`
0%{
    background:grey;
}
100%{
    background:black;
}
`;

const Content = styled.li<StyledContent>`
  width: 170px;
  height: 150px;
  border: 1px solid white;
  margin: 1rem 0;
  cursor: pointer;
}
  @media screen and (max-width: 650px) {
  width: 110px;
  height:100px;
  }
  ${(props) =>
    props.clicked
      ? css`
          animation: ${clickColor} 0.3s linear;
        `
      : ""};
  ${(props) =>
    props.clicked && props.기울기 === "사각형"
      ? css`
          animation: ${rotate} 0.5s linear;
        `
      : ""};
  ${(props) =>
    props.target
      ? css`
          animation: ${changeColor} 0.7s linear;
        `
      : ""};
  ${(props) =>
    props.기울기 === "많이 기울기" ? "transform: skewx(10deg);" : ""};
  ${(props) =>
    props.기울기 === "살짝 기울기" ? "transform: skewx(-4deg);" : ""};
`;

export default MemoryContent;
