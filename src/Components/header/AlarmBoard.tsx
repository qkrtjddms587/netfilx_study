import { styled } from "styled-components";
import AlarmItem from "./AlarmItem";
import UpArrow from "../common/UpArrow";

const Wrapper = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.9;
  background-color: ${(props) => props.theme.black.deepDark};
  border: 1px solid ${(props) => props.theme.black.lighter};
  border-top: 2px solid ${(props) => props.theme.white.lighter};
  position: relative;
`;

export default function AlarmBoard() {
  const alarmItems = [
    { id: "", imgUrl: "", comment: "", updateAt: "" },
    { id: "", imgUrl: "", comment: "", updateAt: "" },
  ];
  return (
    <Wrapper>
      <Board>
        <UpArrow />
        {alarmItems.map((alarm, i) => (
          <AlarmItem {...alarm} key={i} />
        ))}
      </Board>
    </Wrapper>
  );
}
