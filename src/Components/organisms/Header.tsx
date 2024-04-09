import { styled } from "styled-components";
import { useAnimation, useScroll } from "../../libs/utills";
import Avatar from "../atoms/Avatar";
import AlarmPage from "../molecules/AlarmPage";
import Logo from "../atoms/Logo";
import NavItems from "../molecules/NavItems";
import SearchForm from "../molecules/SearchForm";

const Nav = styled.nav<{ $navAnimation: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  color: white;
  padding: 20px 60px;
  font-size: 14px;
  background-color: transparent;
  background-color: ${(props) =>
    props.$navAnimation ? "rgba(0,0,0,1)" : "rgba(0,0,0,0)"};
  transition: background-color 0.2s linear;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  const scrollY = useScroll();
  const navAnimation = useAnimation(scrollY, scrollY > 80);
  return (
    <Nav $navAnimation={navAnimation}>
      <Col>
        <Logo />
        <NavItems />
      </Col>
      <Col>
        <SearchForm />
        <AlarmPage />
        <Avatar />
      </Col>
    </Nav>
  );
}
