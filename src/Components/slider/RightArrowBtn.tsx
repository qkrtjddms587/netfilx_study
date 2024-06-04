import { useRef } from "react";
import { styled } from "styled-components";

interface RightArrowBtnProps {
  isHover: boolean;
  sliderRef: React.RefObject<HTMLDivElement>;
  onUpIndex: () => void;
}

const Wrapper = styled.div`
  position: absolute;
  width: 55px;
  display: flex;
  z-index: 20;
  cursor: pointer;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  right: -60px;
  opacity: 0;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  transition: transform 0.2s ease-in-out;
  z-index: 2;
  &.slide-btn-visible {
    opacity: 1;
  }
  svg:active {
    transform: scale(0.9);
  }
`;

export default function RightArrowBtn({
  isHover,
  sliderRef,
  onUpIndex,
}: RightArrowBtnProps) {
  const onStopper = useRef(false);
  const onRightSliderAnimation = () => {
    if (!sliderRef.current) return;
    sliderRef.current.classList.remove("left-slide");
    sliderRef.current.classList.remove("right-slide");
    void sliderRef.current.offsetWidth;
    sliderRef.current.classList.add("right-slide");
  };
  const ClickedRightArrowBtn = () => {
    if (onStopper.current) return;
    onStopper.current = true;
    onRightSliderAnimation();
    setTimeout(() => {
      onUpIndex();
      onStopper.current = false;
    }, 500);
  };
  return (
    <Wrapper
      className={isHover ? "slide-btn-visible" : ""}
      onClick={ClickedRightArrowBtn}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </Wrapper>
  );
}
