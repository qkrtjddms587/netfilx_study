import HoverPage from "./HoverPage";
import { HandlerObj } from "../organisms/Header";

export default function HoverAlarm({
  onHoverIndex,
  onHover,
  onLeave,
}: HandlerObj) {
  const componentIndex = 1;
  return (
    <>
      <HoverPage
        onHover={onHover}
        onLeave={onLeave}
        componentIndex={componentIndex}
        isHovered={componentIndex === onHoverIndex}
      />
    </>
  );
}
