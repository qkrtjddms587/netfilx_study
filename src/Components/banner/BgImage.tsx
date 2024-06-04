import { styled } from "styled-components";
import { imagePathFormatter } from "../../libs/utills";
import { useEffect, useRef } from "react";

interface BgImageProps {
  image: string;
  isPlay: boolean;
}

const Wrapper = styled.div<{ $bgImage: string }>`
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: url(${({ $bgImage }) => $bgImage});
  background-size: cover;
  transition: opacity 2s ease-in-out;
  transition-delay: 3s;
`;

export default function BgImage({ image, isPlay }: BgImageProps) {
  const bgImageRef = useRef<HTMLDivElement>(null);
  const onBgImageAnimation = (isPlay: boolean) => {
    if (!bgImageRef.current) return;
    bgImageRef.current.style.opacity = isPlay ? "0" : "1";
  };
  useEffect(() => {
    onBgImageAnimation(isPlay);
  }, [isPlay]);
  return <Wrapper ref={bgImageRef} $bgImage={imagePathFormatter(image)} />;
}
