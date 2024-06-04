import { styled } from "styled-components";
import SlideTitle from "./SlideTitle";

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

interface SlideHeaderProps {
  category: string;
  isHover: boolean;
}

export default function SlideHeader({ category, isHover }: SlideHeaderProps) {
  return (
    <Wrapper>
      <SlideTitle category={category} isHover={isHover} />
    </Wrapper>
  );
}
