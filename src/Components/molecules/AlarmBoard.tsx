import { styled } from "styled-components";
import AlarmItem from "../atoms/AlarmItem";

const Wrapper = styled.ul`
  position: absolute;
  top: 50px;
  right: -10px;
  width: 400px;
  opacity: 0.9;
  background-color: ${(props) => props.theme.black.deepDark};
  border: 1px solid ${(props) => props.theme.black.lighter};
  border-top: 2px solid ${(props) => props.theme.white.lighter};
`;

export default function AlarmBoard() {
  const alarmItems = [
    { id: "", imgUrl: "", comment: "", updateAt: "" },
    { id: "", imgUrl: "", comment: "", updateAt: "" },
  ];
  return (
    <Wrapper>
      {alarmItems.map((_, i) => (
        <AlarmItem key={i} />
      ))}
    </Wrapper>
  );
}
