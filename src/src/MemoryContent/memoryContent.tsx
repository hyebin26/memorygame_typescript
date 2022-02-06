import React, { MouseEvent } from "react";
import styled from "styled-components";

const MemoryContent = ({
  contentId,
  current,
}: {
  contentId: number;
  current: null | number;
}) => {
  let 기울기 = "";
  if (contentId === 0 || contentId === 3 || contentId === 6) {
    기울기 = "기울기";
  }
  if (contentId === 1 || contentId === 4 || contentId === 7) {
    기울기 = "살짝기울기";
  }
  const clickContent = (e: MouseEvent) => {
    if (e !== null && e.target instanceof HTMLElement) {
      if (current && contentId === current) {
        const element = e.target;
        const dataCurrent = element.dataset.current;
      }
    }
  };

  return (
    <Content
      shape={기울기}
      onClick={clickContent}
      data-current={false}
    ></Content>
  );
};

const Content = styled.li<{ shape: string }>`
  width: 150px;
  height: 150px;
  list-style: none;
  border: 1px solid #00000061;
  margin: 1rem 0;
  ${(props) => (props.shape === "기울기" ? "transform: skew(-6deg);" : "")};
  ${(props) => (props.shape === "살짝기울기" ? "transform: skew(3deg);" : "")}
`;

export default MemoryContent;
