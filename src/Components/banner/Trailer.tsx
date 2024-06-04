import React, { SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
`;

interface TrailerProps {
  setIsPlay: React.Dispatch<SetStateAction<boolean>>;
  trailerId: string;
  trailerPlayer: React.MutableRefObject<any>;
  setOnSideBtn: React.Dispatch<SetStateAction<boolean>>;
}

function Trailer({
  trailerPlayer,
  setIsPlay,
  trailerId,
  setOnSideBtn,
}: TrailerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onPlayerReady = (event: any) => {
      setIsPlay(true);
      setOnSideBtn(true);
      event.target.playVideo();
    };

    const onPlayerStateChange = (event: any) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
        const duration = event.target.getDuration();
        const currentTime = event.target.getCurrentTime();
        const timeRemaining = duration - currentTime;
        if (timer.current) clearTimeout(timer.current);
        if (timeRemaining > 5) {
          timer.current = setTimeout(() => {
            setIsPlay(false);
          }, (timeRemaining - 5) * 1000);
        } else {
          setIsPlay(false);
        }
        console.log(timer);
      }
    };

    const loadYouTubeAPI = () => {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
      } else if (window.YT && typeof window.YT.Player === "function") {
        window.onYouTubeIframeAPIReady();
      }
    };

    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        trailerPlayer.current = new window.YT.Player(playerRef.current, {
          videoId: trailerId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            modestbranding: 1,
            controls: 0,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    };

    loadYouTubeAPI();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [setIsPlay, trailerId, setOnSideBtn, trailerPlayer]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trailerPlayer.current?.pauseVideo();
      } else {
        trailerPlayer.current?.playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [trailerPlayer]);

  return <Wrapper ref={playerRef} />;
}

export default Trailer;
