import { useRef, useState } from "react";
import { styled } from "styled-components";

const Search = styled.form<{ $inputAnimation: boolean }>`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    left: 10px;
    height: 25px;
    cursor: pointer;
  }
  input {
    background-color: black;
    color: white;
    z-index: -1;
    border: 1px solid white;
    padding: 10px 10px;
    transition: all 0.3s ease-in-out;
    transform-origin: right center;
    width: 35px;
    opacity: 0;
    &:focus {
      outline: none;
      padding-left: 40px;
      width: 275px;
      opacity: 1;
    }
  }
`;

export default function SearchForm() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    searchInput.current?.focus();
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
      <input ref={searchInput} type="text" placeholder="제목, 사람, 장르" />
    </Search>
  );
}
