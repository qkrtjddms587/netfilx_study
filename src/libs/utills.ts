import { useEffect, useRef, useState } from "react";

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const getWindowScrollPosition = () => {
    const { pageYOffset } = window;
    return pageYOffset;
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(getWindowScrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
}

export function useAnimation(value: any, definition: boolean) {
  const onAnimation = useRef(false);
  useEffect(() => {
    if (definition) {
      onAnimation.current = true;
    } else {
      onAnimation.current = false;
    }
  }, [value, definition]);
  return onAnimation.current;
}
