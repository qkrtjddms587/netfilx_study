import { styled } from "styled-components";
import AgeLimit from "./AgeLimit";
import SideBtn from "./SideBtn";
import { SetStateAction } from "react";

interface SideBtnProps {
  trailerPlayer: React.MutableRefObject<any>;
  setIsMuted: React.Dispatch<SetStateAction<boolean>>;
  setIsPlay: React.Dispatch<SetStateAction<boolean>>;
  isPlay: boolean;
  isMuted: boolean;
  onSideBtn: boolean;
}

const Wrapper = styled.div`
  align-items: center;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: 0;
  bottom: 30%;
`;

export default function SideBar({
  trailerPlayer,
  setIsMuted,
  isPlay,
  isMuted,
  onSideBtn,
  setIsPlay,
}: SideBtnProps) {
  return (
    <Wrapper>
      {onSideBtn ? (
        <SideBtn
          trailerPlayer={trailerPlayer}
          isPlay={isPlay}
          setIsMuted={setIsMuted}
          isMuted={isMuted}
          setIsPlay={setIsPlay}
        />
      ) : null}
      <AgeLimit adult />
    </Wrapper>
  );
}
