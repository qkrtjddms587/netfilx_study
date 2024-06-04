import { styled } from "styled-components";

const Wrapper = styled.div`
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

export default function MovieBtns() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}
