import { HandlerObj } from "../organisms/Header";
import HoverPage from "./HoverPage";

export default function HoverProfile({
  onHoverIndex,
  onHover,
  onLeave,
}: HandlerObj) {
  const componentIndex = 2;
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
