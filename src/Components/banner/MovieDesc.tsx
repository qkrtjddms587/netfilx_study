import React, { useEffect, useRef, forwardRef } from "react";
import { styled } from "styled-components";
import { summarizedDesc } from "../../libs/utills";

interface MovieDescProps {
  description: string;
  isPlay: boolean;
  descDivRef: React.RefObject<HTMLDivElement>;
}

const Wrapper = styled.div`
  font-size: 1.2vw;
  opacity: 1;
  transform-origin: bottom left;
  transition: opacity 2s ease-in-out, transform 2s ease-in-out;
  transition-delay: 3s;
`;

const MovieDesc = forwardRef<HTMLDivElement, MovieDescProps>(
  ({ descDivRef, description, isPlay }: MovieDescProps, ref) => {
    const onDescAnimation = (
      ref: React.RefObject<HTMLDivElement>,
      isPlay: boolean
    ) => {
      if (ref && "current" in ref && ref.current) {
        if (isPlay) {
          ref.current.style.opacity = "0";
          ref.current.style.transform = "scale(0)";
        } else {
          ref.current.style.opacity = "1";
          ref.current.style.transform = "scale(1)";
        }
      }
    };

    useEffect(() => {
      onDescAnimation(descDivRef, isPlay);
    }, [isPlay]);
    return <Wrapper ref={ref}>{summarizedDesc(description)}</Wrapper>;
  }
);

export default MovieDesc;
