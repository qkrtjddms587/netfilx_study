import { useRef } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 55px;
  display: flex;
  z-index: 20;
  cursor: pointer;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  left: -60px;
  opacity: 0;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  transition: transform 0.2s ease-in-out;
  &.slide-btn-visible {
    opacity: 1;
  }
  svg:active {
    transform: scale(0.9);
  }
`;

interface LeftArrowBtnProps {
  isHover: boolean;
  sliderRef: React.RefObject<HTMLDivElement>;
  onDownIndex: () => void;
}

export default function LeftArrowBtn({
  isHover,
  sliderRef,
  onDownIndex,
}: LeftArrowBtnProps) {
  const onStopper = useRef(false);
  const onLeftSliderAnimation = () => {
    if (!sliderRef.current) return;
    sliderRef.current.classList.remove("right-slide");
    sliderRef.current.classList.remove("left-slide");
    void sliderRef.current.offsetWidth;
    sliderRef.current.classList.add("left-slide");
  };
  const ClickedLeftArrowBtn = () => {
    if (onStopper.current) return;
    onStopper.current = true;
    onLeftSliderAnimation();
    setTimeout(() => {
      onDownIndex();
      onStopper.current = false;
    }, 500);
  };
  return (
    <Wrapper
      className={isHover ? "slide-btn-visible" : ""}
      onClick={ClickedLeftArrowBtn}
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
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </Wrapper>
  );
}
