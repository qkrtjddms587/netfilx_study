import { styled } from "styled-components";
import NavItem from "../atoms/NavItem";

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export default function NavItems() {
  const navItems = [
    { name: "홈", href: "/" },
    { name: "시리즈", href: "/series" },
    { name: "영화", href: "/movies" },
    { name: "NEW! 요즘 대세 콘텐츠", href: "/hot" },
    { name: "내가 찜한 리스트", href: "/pick" },
    { name: "언어별로 찾아보기", href: "/language" },
  ];
  return (
    <Items>
      {navItems.map((item, i) => (
        <NavItem key={i} {...item} />
      ))}
    </Items>
  );
}
