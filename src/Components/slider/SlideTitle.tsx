import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SeeAllIcon from "./SeeAllIcon";
import { useState } from "react";

interface SlideTitleProps {
  category: string;
  isHover: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 1.4vw;
`;
const SeeAll = styled.div`
  display: flex;
  color: #54b9c5;
`;

const SeeAllText = styled.div`
  display: flex;
  font-size: 0.9vw;
  transform: scaleX(0);
  opacity: 0;
  max-width: 0;
  transition: transform 0.75s ease, max-width 1s ease, opacity 1s ease;
  transform-origin: center left;
  white-space: nowrap;
  &.see-all-hidden {
  }
  &.see-all-visible {
    max-width: 100px;
    transform: scaleX(1);
    opacity: 1;
  }
`;

export default function SlideTitle({ category, isHover }: SlideTitleProps) {
  const [onSeeAllText, setOnSeeAllText] = useState(false);
  const handleHover = () => {
    setOnSeeAllText(true);
  };
  const handleLeave = () => {
    setOnSeeAllText(false);
  };
  return (
    <Link to={"/"}>
      <Wrapper onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        <Title>{category}</Title>
        <SeeAll>
          <SeeAllText
            className={onSeeAllText ? "see-all-visible" : "see-all-hidden"}
          >
            모두보기
          </SeeAllText>
          {isHover ? <SeeAllIcon /> : null}
        </SeeAll>
      </Wrapper>
    </Link>
  );
}
