import { useState } from "react";
import { styled } from "styled-components";
import SlideHeader from "./SlideHeader";
import SlideContents from "./SlideContents";
import { Movie } from "../../api";

const Container = styled.div`
  position: relative;
  padding: 0 60px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 3vw 0;
`;

interface SliderContainerProps {
  movies: Movie[];
  category: string;
}

export default function SliderContainer({
  movies,
  category,
}: SliderContainerProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Container
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <SlideHeader isHover={isHover} category={category} />
      <SlideContents movies={movies} isHover={isHover} />
    </Container>
  );
}
