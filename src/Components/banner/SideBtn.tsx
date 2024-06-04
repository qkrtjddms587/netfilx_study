import { styled } from "styled-components";
import { SetStateAction } from "react";
import SideSoundIcon from "./SideSoundIcon";

interface SideBtnProps {
  trailerPlayer: React.MutableRefObject<any>;
  setIsMuted: React.Dispatch<SetStateAction<boolean>>;
  setIsPlay: React.Dispatch<SetStateAction<boolean>>;
  isPlay: boolean;
  isMuted: boolean;
}

const Wrapper = styled.div`
  width: 3vw;
  height: 3vw;
  margin-right: 1.1vw;
  border: 1px solid rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const Svg = styled.svg`
  width: 70%;
  height: 70%;
`;

export default function SideBtn({
  trailerPlayer,
  isPlay,
  isMuted,
  setIsMuted,
  setIsPlay,
}: SideBtnProps) {
  const handleMute = () => {
    if (trailerPlayer.current) {
      if (isMuted) {
        trailerPlayer.current.unMute();
      } else {
        trailerPlayer.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };
  const handleReplay = () => {
    if (trailerPlayer.current) {
      trailerPlayer.current.seekTo(0);
      setIsPlay(true);
    }
  };
  return (
    <>
      {isPlay ? (
        <Wrapper onClick={handleMute}>
          <SideSoundIcon isMuted={isMuted} />
        </Wrapper>
      ) : (
        <Wrapper onClick={handleReplay}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M20.6625 7C18.9328 4.00995 15.7002 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12H24C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C16.1752 0 19.8508 2.13204 22 5.36482V2H24V8C24 8.55228 23.5523 9 23 9H17V7H20.6625Z"
              fill="currentColor"
            ></path>
          </Svg>
        </Wrapper>
      )}
    </>
  );
}
