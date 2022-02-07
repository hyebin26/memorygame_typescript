import React, { MouseEvent, useState } from "react";
import styled, { css, keyframes } from "styled-components";

type MemoryContentType = {
  contentId: number;
  current: null | number | undefined;
  onClickContent: (id: number) => void;
};

const MemoryContent = ({
  contentId,
  current,
  onClickContent,
}: MemoryContentType) => {
  const [clicked, setClicked] = useState(false);
  let 기울기 = "";
  if (contentId === 0 || contentId === 3 || contentId === 6) {
    기울기 = "기울기";
  }
  if (contentId === 1 || contentId === 4 || contentId === 7) {
    기울기 = "살짝기울기";
  }
  const clickContent = (e: MouseEvent) => {
    if (e !== null && e.target instanceof HTMLElement) {
      onClickContent(contentId);
      setClicked(true);
    }
  };
  return (
    <Content
      shape={기울기}
      onClick={clickContent}
      data-target={current === contentId ? "true" : "false"}
      data-click={clicked}
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

const Content = styled.li<{
  shape: string;
  "data-target": string;
  "data-click": boolean;
}>`
  width: 150px;
  height: 150px;
  list-style: none;
  border: 1px solid #00000061;
  margin: 1rem 0;
  transition: 0.2s;
  cursor: pointer;

  ${(props) =>
    props["data-target"] === "true"
      ? css`
          animation: ${changeColor} 1s;
        `
      : ""};
  ${(props) => (props.shape === "기울기" ? "transform: skew(-6deg);" : "")};
  ${(props) => (props.shape === "살짝기울기" ? "transform: skew(3deg);" : "")}
`;

export default MemoryContent;
