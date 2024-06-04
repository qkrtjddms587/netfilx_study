import { styled } from "styled-components";
import NavItem from "./NavItem";
import HoverNav from "./HoverNav";
import { HandlerObj } from "../organisms/Header";

interface NavItmesProps {
  isRow: boolean;
  handlerObj: HandlerObj;
}

const Items = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
`;

export default function NavItems({ isRow, handlerObj }: NavItmesProps) {
  const navItems = [
    { name: "홈", href: "/" },
    { name: "시리즈", href: "/series" },
    { name: "영화", href: "/movies" },
    { name: "NEW! 요즘 대세 콘텐츠", href: "/hot" },
    { name: "내가 찜한 리스트", href: "/pick" },
    { name: "언어별로 찾아보기", href: "/language" },
  ];
  return (
    <>
      {isRow ? (
        <Items>
          {navItems.map((item, i) => (
            <NavItem key={i} {...item} />
          ))}
        </Items>
      ) : (
        <HoverNav {...handlerObj} />
      )}
    </>
  );
}
