import { styled } from "styled-components";
import { Movie } from "../../api";
import { getMovieTrailer, imagePathFormatter } from "../../libs/utills";
import { useEffect, useRef, useState } from "react";
import Trailer from "./Trailer";
import SideBar from "./SideBar";
import BgImage from "./BgImage";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  aspect-ratio: 16/9;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 90%,
      rgba(0, 0, 0, 1) 100%
    ),
    linear-gradient(77deg, rgba(0, 0, 0, 0.6), transparent 85%);
  margin-bottom: -70px;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  left: 60px;
  width: 36%;
  position: absolute;
  top: 0;
  bottom: 25%;
`;

const MovieTitle = styled.div`
  font-size: 6vw;
  margin-bottom: 1.2vw;
  line-height: normal;
  transform-origin: bottom left;
  transition: transform 2s ease-in;
  transition-delay: 3s;
`;

const MovieDesc = styled.div`
  font-size: 1.2vw;
  opacity: 1;
  transform-origin: bottom left;
  transition: opacity 2s ease-in-out, transform 2s ease-in-out;
  transition-delay: 3s;
`;

const MovieBtns = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5vw;
  margin-bottom: 1rem;
`;

const MoviePlayBtn = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  opacity: 1;
  padding: 0.8rem;
  padding-left: 2rem;
  padding-right: 2.4rem;
  transition: opacity 0.2s ease-in;
  gap: 0.5rem;
  &:hover {
    opacity: 0.75;
  }
  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
  span {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`;

const MovieInfoBtn = styled(MoviePlayBtn)`
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
`;

export default function Banner({ titleMovie }: { titleMovie: Movie }) {
  const index = titleMovie.overview.indexOf(".") + 1;
  const description = titleMovie.overview.substring(0, index);
  const trailerId = getMovieTrailer(titleMovie.id);
  const trailerPlayer = useRef<any>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [onSideBtn, setOnSideBtn] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const descDivRef = useRef<HTMLDivElement>(null);
  const titleDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      const newDescDivHeight = descDivRef.current?.offsetHeight;
      if (titleDivRef.current) {
        titleDivRef.current.style.transform = `translateY(${newDescDivHeight}px)`;
      }
    };
    if (descDivRef.current) {
      if (isPlay) {
        const descDivHeight = descDivRef.current?.offsetHeight;
        descDivRef.current.style.opacity = "0";
        descDivRef.current.style.transform = "scale(0)";
        if (titleDivRef.current) {
          titleDivRef.current.style.transform = `translateY(${descDivHeight}px) scale(0.6)`;
        }
      } else {
        descDivRef.current.style.opacity = "1";
        descDivRef.current.style.transform = "scale(1)";
        if (titleDivRef.current) {
          titleDivRef.current.style.transform = `translateY(0) scale(1)`;
        }
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isPlay]);
  return (
    <Wrapper>
      <BgImage
        isPlay={isPlay}
        image={imagePathFormatter(titleMovie.backdrop_path)}
      />
      {trailerId ? (
        <Trailer
          setOnSideBtn={setOnSideBtn}
          trailerPlayer={trailerPlayer}
          setIsPlay={setIsPlay}
          trailerId={trailerId}
        />
      ) : null}

      <MovieInfo>
        <MovieTitle ref={titleDivRef}>{titleMovie.title}</MovieTitle>
        <MovieDesc
          ref={descDivRef}
          className={isPlay ? "movie-info-hidden" : ""}
        >
          {description}
        </MovieDesc>
        <MovieBtns>
          <MoviePlayBtn>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
            <span>재생</span>
          </MoviePlayBtn>
          <MovieInfoBtn>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <span>상세 정보</span>
          </MovieInfoBtn>
        </MovieBtns>
      </MovieInfo>
      <SideBar
        setIsPlay={setIsPlay}
        onSideBtn={onSideBtn}
        trailerPlayer={trailerPlayer}
        isMuted={isMuted}
        isPlay={isPlay}
        setIsMuted={setIsMuted}
      />
    </Wrapper>
  );
}
