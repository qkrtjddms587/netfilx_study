import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { getOffsetHeight, summarizedDesc } from "../../libs/utills";
import MovieDesc from "./MovieDesc";
import MovieTitle from "./MovieTitle";
import MovieBtns from "./MovieBtns";

interface MovieInfoProps {
  title: string;
  description: string;
  isPlay: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  left: 60px;
  width: 36%;
  position: absolute;
  top: 0;
  bottom: 25%;
`;

export default function MovieInfo({
  title,
  description,
  isPlay,
}: MovieInfoProps) {
  const descDivRef = useRef<HTMLDivElement>(null);
  const [offsetHeight, setOffsetHeight] = useState(getOffsetHeight(descDivRef));
  useEffect(() => {
    const handleResize = () => {
      setOffsetHeight(getOffsetHeight(descDivRef));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Wrapper>
      <MovieTitle offsetHeight={offsetHeight} title={title} isPlay={isPlay} />
      <MovieDesc
        ref={descDivRef}
        descDivRef={descDivRef}
        description={description}
        isPlay={isPlay}
      />
      <MovieBtns />
    </Wrapper>
  );
}
