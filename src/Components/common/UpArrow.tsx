import { styled } from "styled-components";

interface UpArrowProps {
  position?: "middle" | "right";
}

const Svg = styled.svg<{ $position: string }>`
  position: absolute;
  top: -20px;
  right: ${({ $position }) => ($position === "right" ? "7px" : "90px")};
  width: 20px;
  height: 20px;
`;

export default function UpArrow({ position = "right" }: UpArrowProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
      $position={position}
    >
      <path
        fillRule="evenodd"
        d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
