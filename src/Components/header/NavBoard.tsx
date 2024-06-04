import { styled } from "styled-components";
import UpArrow from "../common/UpArrow";
import NavBoardItem from "./NavBoardItem";

const Wrapper = styled.ul`
  position: absolute;
  top: 50px;
  left: -100px;
`;

const Board = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: center;
  opacity: 0.9;
  background-color: ${(props) => props.theme.black.deepDark};
  border: 1px solid ${(props) => props.theme.black.lighter};
  border-top: 2px solid ${(props) => props.theme.white.lighter};
  position: relative;
`;

export default function NavBoard() {
  const navItems = [
    { name: "홈", href: "/" },
    { name: "시리즈", href: "/series" },
    { name: "영화", href: "/movies" },
    { name: "NEW! 요즘 대세 콘텐츠", href: "/hot" },
    { name: "내가 찜한 리스트", href: "/pick" },
    { name: "언어별로 찾아보기", href: "/language" },
  ];
  return (
    <Wrapper>
      <Board>
        <UpArrow position="middle" />
        {navItems.map((item, i) => (
          <NavBoardItem key={i} {...item} />
        ))}
      </Board>
    </Wrapper>
  );
}
