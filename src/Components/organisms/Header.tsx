import { styled } from "styled-components";
import { useScrollAnimation, useWindowDimenstion } from "../../libs/utills";

import Logo from "../common/Logo";
import SearchForm from "../header/SearchForm";
import NavItems from "../header/NavItems";
import { useState } from "react";
import HeaderAlarm from "../header/HoverAlarm";
import HeaderProfile from "../header/HoverProfile";

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  padding: 10px 30px;
  font-size: 0.8vw;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    transparent
  );
  transition: background-color 0.2s linear;
  z-index: 2;
  &.bg-black {
    background-color: rgba(0, 0, 0, 1);
  }
  &.bg-transparents {
    background-color: transparent;
  }
`;

const NavCol = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const IconCol = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export interface HandlerObj {
  onHoverIndex: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
}

export default function Header() {
  const onAnimation = useScrollAnimation(80);
  const width = useWindowDimenstion();
  const [onHoverIndex, setOnHoverIndex] = useState<number | null>(null);
  let timer: ReturnType<typeof setTimeout>;
  const handlerObj = {
    onHoverIndex,
    onHover(hoverIndex: number) {
      clearTimeout(timer);
      setOnHoverIndex(hoverIndex);
    },
    onLeave() {
      timer = setTimeout(() => {
        setOnHoverIndex(null);
      }, 200);
    },
  };
  return (
    <Nav className={onAnimation ? "bg-black" : "bg-transparent"}>
      <NavCol>
        <Logo />
        <NavItems isRow={width > 800} handlerObj={handlerObj} />
      </NavCol>
      <IconCol>
        <SearchForm />
        <HeaderAlarm {...handlerObj} />
        <HeaderProfile {...handlerObj} />
      </IconCol>
    </Nav>
  );
}
