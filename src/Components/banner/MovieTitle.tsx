import { off } from "process";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";

interface MovieTitleProps {
  offsetHeight: number;
  isPlay: boolean;
  title: string;
}

const Wrapper = styled.div`
  font-size: 6vw;
  margin-bottom: 1.2vw;
  line-height: normal;
  transform-origin: bottom left;
  transition: transform 2s ease-in;
  transition-delay: 3s;
`;

export default function MovieTitle({
  offsetHeight,
  isPlay,
  title,
}: MovieTitleProps) {
  const titleDivRef = useRef<HTMLDivElement>(null);
  const onTitleAnimation = (
    ref: React.RefObject<HTMLDivElement>,
    isPlay: boolean,
    offsetHeight: number
  ) => {
    if (!ref.current) return;
    if (isPlay) {
      ref.current.style.transform = `translateY(${offsetHeight}px) scale(0.6)`;
    } else {
      ref.current.style.transform = "scale(1)";
    }
  };
  useEffect(() => {
    onTitleAnimation(titleDivRef, isPlay, offsetHeight);
  }, [isPlay, offsetHeight]);
  return <Wrapper ref={titleDivRef}>{title}</Wrapper>;
}
