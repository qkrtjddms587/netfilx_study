import { styled } from "styled-components";
import DownArrow from "../common/DownArrow";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  span {
    width: 25px;
  }
  svg {
    width: 15px;
  }
`;

export default function NavIcon() {
  return (
    <Wrapper>
      <span>메뉴</span>
      <DownArrow />
    </Wrapper>
  );
}
