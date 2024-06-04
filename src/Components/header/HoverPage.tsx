import { styled } from "styled-components";
import HoverIcon from "../common/HoverIcon";
import HoverBoard from "../common/HoverBoard";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  position: relative;
`;

interface HoverPageProps {
  componentIndex: number;
  onHover: (index: number) => void;
  onLeave: () => void;
  isHovered: boolean;
}

export default function HoverPage({
  componentIndex,
  onHover,
  onLeave,
  isHovered,
}: HoverPageProps) {
  const handleMouseEnter = () => {
    onHover(componentIndex);
  };
  const handleMouseLeave = () => {
    onLeave();
  };
  return (
    <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <HoverIcon componentIndex={componentIndex} />
      {isHovered ? <HoverBoard componentIndex={componentIndex} /> : null}
    </Wrapper>
  );
}
