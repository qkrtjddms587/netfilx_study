import { keyframes, styled } from "styled-components";
import LeftArrowBtn from "./LeftArrowBtn";
import RightArrowBtn from "./RightArrowBtn";
import { useGetSplitMovies, useSlide, useSlideWidth } from "../../libs/utills";
import { useRef, useState } from "react";
import SlideRow from "./SlideRow";
import PageIndicator from "./PageIndicator";
import { Movie } from "../../api";

const slideAnimation = (width: number) => keyframes`
  0%{
    transform: translateX(0);
  }100%{
    transform: translateX(${width}px);
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Contents = styled.div<{ $right: number; $left: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  &.left-slide {
    animation: ${({ $left }) => slideAnimation($left)} 0.5s ease-in-out;
  }
  &.right-slide {
    animation: ${({ $right }) => slideAnimation(-$right)} 0.5s ease-in-out;
  }
`;

interface SlideContentsProps {
  movies: Movie[];
  isHover: boolean;
}

export default function SlideContents({ movies, isHover }: SlideContentsProps) {
  const maxIndex = movies.length;
  const sliderRef = useRef<HTMLDivElement>(null);
  const { width, offset, boxWidth, initialSlideWidth } = useSlide(115);
  const [index, setIndex] = useState(0);
  // const splitMovies = getSplitMovies(movies, index, offset);
  const getSplitMovies = useGetSplitMovies(movies, offset);
  const splitMovies = getSplitMovies(index);
  const { right, left } = useSlideWidth(
    index,
    maxIndex,
    offset,
    boxWidth,
    initialSlideWidth
  );
  const onInfiniteSlide = useRef(false);
  const onDownIndex = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return maxIndex - offset;
      }
      const newIndex = prev - offset;
      return newIndex < 0 ? 0 : newIndex;
    });
  };
  const onUpIndex = () => {
    if (!onInfiniteSlide.current) onInfiniteSlide.current = true;
    setIndex((prev) => {
      const newIndex = prev + offset;
      const maxAllowedIndex = maxIndex - offset;
      if (newIndex > maxAllowedIndex) {
        return prev === maxAllowedIndex ? 0 : maxAllowedIndex;
      }
      return newIndex;
    });
  };
  return (
    <Wrapper>
      <PageIndicator index={index} offset={offset} maxIndex={maxIndex} />
      {onInfiniteSlide.current ? (
        <LeftArrowBtn
          isHover={isHover}
          sliderRef={sliderRef}
          onDownIndex={onDownIndex}
        />
      ) : null}
      <Contents $right={right} $left={left} ref={sliderRef}>
        {splitMovies.map((movies, i) =>
          i || onInfiniteSlide.current ? (
            <SlideRow
              key={i}
              width={width}
              offset={offset}
              movies={movies}
              position={i}
            />
          ) : null
        )}
      </Contents>
      <RightArrowBtn
        isHover={isHover}
        sliderRef={sliderRef}
        onUpIndex={onUpIndex}
      />
    </Wrapper>
  );
}
