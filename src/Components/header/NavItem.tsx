import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";

interface NavItemProps {
  href: string;
  name: string;
}

const Item = styled.li`
  a {
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.black.lighter};
    }
  }
`;

const SelectedItem = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-weight: 400;
  cursor: default;
`;

export default function NavItem({ href, name }: NavItemProps) {
  const { pathname } = useLocation();
  return (
    <Item>
      <Link to={href}>
        {pathname === href ? <SelectedItem>{name}</SelectedItem> : name}
      </Link>
    </Item>
  );
}
