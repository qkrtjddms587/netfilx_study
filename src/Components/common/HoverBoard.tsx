import AlarmBoard from "../header/AlarmBoard";
import NavBoard from "../header/NavBoard";

interface HoverBoardProps {
  componentIndex: number;
}

export default function HoverBoard({ componentIndex }: HoverBoardProps) {
  return (
    <>
      {componentIndex === 0 ? <NavBoard /> : null}
      {componentIndex === 1 ? <AlarmBoard /> : null}
      {componentIndex === 2 ? <AlarmBoard /> : null}
    </>
  );
}
