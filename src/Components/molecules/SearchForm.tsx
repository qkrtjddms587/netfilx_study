import { useState } from "react";
import { styled } from "styled-components";

const Search = styled.form<{ $inputAnimation: boolean }>`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;
  svg {
    height: 25px;
    cursor: pointer;
    transform: ${(props) =>
      props.$inputAnimation ? "translateX(-245px)" : "translateX(0)"};
    transition: transform 0.3s ease-in-out;
  }
  input {
    position: absolute;
    width: 275px;
    right: 0;
    padding: 10px 10px;
    padding-left: 40px;
    background-color: black;
    color: white;
    z-index: -1;
    border: 1px solid white;
    transform: ${(props) =>
      props.$inputAnimation ? "scaleX(1)" : "scaleX(0)"};
    transform-origin: right center;
    transition: transform 0.3s ease-in-out;
    &:focus {
      outline: none;
    }
  }
`;

export default function SearchForm() {
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };
  return (
    <Search $inputAnimation={searchOpen}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        onClick={toggleSearch}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input type="text" placeholder="제목, 사람, 장르" />
    </Search>
  );
}
