import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";

interface NavBoardItemProps {
  href: string;
  name: string;
}

const Item = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  transition: background-color 0.3s ease-in-out;
  a {
    color: ${(props) => props.theme.black.lighter};
  }
  &:hover {
    background-color: ${(props) => props.theme.black.darker};
  }
`;

const SelectedItem = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-weight: 400;
  cursor: default;
`;

export default function NavBoardItem({ href, name }: NavBoardItemProps) {
  const { pathname } = useLocation();
  return (
    <Item>
      <Link to={href}>
        {pathname === href ? <SelectedItem>{name}</SelectedItem> : name}
      </Link>
    </Item>
  );
}
