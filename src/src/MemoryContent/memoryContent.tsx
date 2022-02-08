import React, { MouseEvent, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

type MemoryContentType = {
  contentId: number;
  current: null | number | undefined;
  onClickContent: (id: number) => void;
};

type ContentLI = {
  shape: string;
  target: boolean;
  active: boolean;
};

const MemoryContent = ({
  contentId,
  current,
  onClickContent,
}: MemoryContentType) => {
  const [active, setActive] = useState(false);
  const 기울기 = useRef("사각형");
  if (contentId === 0 || contentId === 3 || contentId === 6) {
    기울기.current = "기울기";
  }
  if (contentId === 1 || contentId === 4 || contentId === 7) {
    기울기.current = "살짝기울기";
  }
  const clickContent = (e: MouseEvent) => {
    onClickContent(contentId);
    setActive(true);
  };

  return (
    <Content
      shape={기울기.current}
      onClick={clickContent}
      target={current === contentId ? true : false}
      active={active}
    ></Content>
  );
};

const changeColor = keyframes`
  0% {
    background:#00000061;
  }
  100%{
    background:white;
  }
`;

const clickColor = keyframes`
0% {
  background:#00000061;
}
100%{
  background:white;
}
`;

const Content = styled.li<ContentLI>`
  width: 150px;
  height: 150px;
  list-style: none;
  border: 1px solid #00000061;
  margin: 1rem 0;
  transition: 0.2s;
  cursor: pointer;
  ${(props) =>
    props.active
      ? css`
          animation: ${clickColor} 1s;
        `
      : ""}
  ${(props) =>
    props.target
      ? css`
          animation: ${changeColor} 1s;
        `
      : ""};
  ${(props) => (props.shape === "기울기" ? "transform: skew(-6deg);" : "")};
  ${(props) => (props.shape === "살짝기울기" ? "transform: skew(3deg);" : "")}
`;

export default MemoryContent;
