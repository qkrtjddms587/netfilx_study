import HoverPage from "./HoverPage";
import { HandlerObj } from "../organisms/Header";

export default function HoverNav({
  onHoverIndex,
  onHover,
  onLeave,
}: HandlerObj) {
  const componentIndex = 0;
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
