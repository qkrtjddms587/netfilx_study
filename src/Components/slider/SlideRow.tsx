import { styled } from "styled-components";
import SlideBox from "./SlideBox";
import { Movie } from "../../api";

const Wrapper = styled.div<{ width: number; offset: number }>`
  display: grid;
  grid-template-columns: ${({ offset }) => `repeat(${offset},1fr)`};
  gap: 5px;
  width: 100%;
  z-index: 3px;
  &.prev {
    position: absolute;
    top: 0;
    left: ${({ width }) => `-${width - 115}px`};
  }
  &.next {
    position: absolute;
    top: 0;
    left: ${({ width }) => `${width - 115}px`};
  }
`;

interface SliderRowProps {
  width: number;
  offset: number;
  movies: Movie[];
  position: number;
}

export default function SlideRow({
  width,
  offset,
  movies,
  position = 1,
}: SliderRowProps) {
  const positionCN = !position ? "prev" : position === 2 ? "next" : "current";
  return (
    <Wrapper className={positionCN} width={width} offset={offset}>
      {movies.map((movie, i) => (
        <SlideBox key={positionCN + i} movie={movie} />
      ))}
    </Wrapper>
  );
}
