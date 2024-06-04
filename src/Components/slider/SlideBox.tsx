import { styled } from "styled-components";
import { Movie } from "../../api";
import { imagePathFormatter } from "../../libs/utills";
import { useState } from "react";

const Wrapper = styled.div<{ $bgImage: string }>`
  background-image: url(${({ $bgImage }) => $bgImage}});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  aspect-ratio: 16/9;
  border-radius: 5px;
`;

export default function SlideBox({ movie }: { movie: Movie }) {
  const [isHover, setIsHover] = useState();
  return (
    <Wrapper
      $bgImage={imagePathFormatter(movie.backdrop_path, "w500")}
    ></Wrapper>
  );
}
