import { styled } from "styled-components";

const Svg = styled.svg`
  width: 0.9vw;
  height: 0.9vw;
`;

export default function SeeAllIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </Svg>
  );
}
