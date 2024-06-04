import { styled } from "styled-components";

const Wrapper = styled.li`
  width: 400px;
  height: 100px;
  display: flex;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.black.lighter};
`;

const Img = styled.img`
  width: 100px;
  background-color: royalblue;
  border-radius: 5px;
  height: 100%;
  margin-right: 20px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  h1 {
    font-size: 16px;
  }
  h2 {
    font-size: 12px;
    color: ${(props) => props.theme.white.darker};
    opacity: 0.7;
  }
`;

interface AlarmItemProps {
  imgUrl: string;
  comment: string;
}

export default function AlarmItem({ imgUrl, comment }: AlarmItemProps) {
  return (
    <Wrapper>
      <Img src={imgUrl} />
      <Contents>
        <h1>신규 콘텐츠</h1>
        <h1>{comment}</h1>
        <h2>1주 전</h2>
      </Contents>
    </Wrapper>
  );
}
