import { styled } from "styled-components";

const Wrapper = styled.ul`
  position: absolute;
  right: 0;
  top: -15px;
  display: flex;
  gap: 1px;
`;

const Page = styled.li`
  background-color: #4d4d4d;
  display: inline-block;
  height: 2px;
  width: 12px;
  &.current-page {
    background-color: #aaa;
  }
`;

interface PageIndicatorProps {
  index: number;
  maxIndex: number;
  offset: number;
}

export default function PageIndicator({
  index,
  maxIndex,
  offset,
}: PageIndicatorProps) {
  const pages = Array(Math.ceil(maxIndex / offset)).fill(0);
  const currentPage = Math.ceil(index / offset);
  return (
    <Wrapper>
      {pages.map((_, i) => (
        <Page
          key={i}
          className={i === currentPage ? "current-page" : ""}
        ></Page>
      ))}
    </Wrapper>
  );
}
