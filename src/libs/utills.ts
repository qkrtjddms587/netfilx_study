import { useCallback, useEffect, useMemo, useState } from "react";
import { Movie } from "../api";

export function useScroll(delay = 200) {
  const [scrollY, setScrollY] = useState(0);
  const getWindowScrollPosition = () => {
    const { pageYOffset } = window;
    return pageYOffset;
  };
  useEffect(() => {
    let throttling = false;
    const handleScroll = () => {
      if (!throttling) {
        setScrollY(getWindowScrollPosition);
        throttling = true;
        setTimeout(() => {
          throttling = false;
        }, delay);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [delay]);
  return scrollY;
}

export function useScrollAnimation(operatingValue: number) {
  const [onAnimation, setOnAnimation] = useState(false);
  const throttleDelay = 50;
  const getWindowScrollPosition = () => {
    const { pageYOffset } = window;
    return pageYOffset;
  };
  useEffect(() => {
    let throttling = false;
    const handleScroll = () => {
      if (!throttling) {
        const scrollY = getWindowScrollPosition();
        if (scrollY > operatingValue) {
          setOnAnimation(true);
        } else {
          setOnAnimation(false);
        }
        throttling = true;
        setTimeout(() => {
          throttling = false;
        }, throttleDelay);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [operatingValue]);
  return onAnimation;
}

export function useAnimation(value: any, definition: boolean) {
  const [onAnimation, setOnAnimation] = useState(false);
  useEffect(() => {
    if (definition) {
      setOnAnimation(true);
    } else {
      setOnAnimation(false);
    }
  }, [value, definition]);
  return onAnimation;
}

export function useWindowDimenstion() {
  const getWindowDimensions = () => {
    const { innerWidth } = window;
    return innerWidth;
  };
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}

export function useSlide(cV: number) {
  const getWidth = useCallback(() => window.innerWidth, []);

  const getOffset = useCallback((width: number) => {
    if (width < 800) return 3;
    if (width < 1050) return 4;
    if (width < 1250) return 5;
    return 6;
  }, []);

  const getBoxWidth = useCallback(
    (width: number, offset: number, cV: number) => {
      return (width - cV) / offset;
    },
    []
  );

  const initialState = useCallback(() => {
    const width = getWidth();
    const offset = getOffset(width);
    const boxWidth = getBoxWidth(width, offset, cV);
    return { width, offset, boxWidth, initialSlideWidth: width - cV };
  }, [cV, getWidth, getOffset, getBoxWidth]);

  const [result, setResult] = useState(initialState);
  useEffect(() => {
    const handleResize = () => {
      const width = getWidth();
      const offset = getOffset(width);
      const boxWidth = getBoxWidth(width, offset, cV);
      const initialSlideWidth = getWidth() - cV;
      setResult({ width, offset, boxWidth, initialSlideWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cV, getWidth, getOffset, getBoxWidth]);
  return result;
}

export function useSlideWidth(
  index: number,
  maxIndex: number,
  offset: number,
  boxWidth: number,
  initialSlideWidth: number
) {
  const initialState = useMemo(
    () => ({
      left: initialSlideWidth,
      right: initialSlideWidth,
    }),
    [initialSlideWidth]
  );
  const [slideWidth, setSlideWidth] = useState(initialState);
  useEffect(() => {
    setSlideWidth((prev) => {
      const indexDiff = maxIndex - index - offset;
      let newLeft = initialSlideWidth;
      let newRight = initialSlideWidth;
      if (indexDiff && index) {
        if (indexDiff < offset) {
          newRight = indexDiff * boxWidth;
        } else if (index < offset) {
          newLeft = index * boxWidth;
        }
      }
      if (prev.left !== newLeft || prev.right !== newRight) {
        return { left: newLeft, right: newRight };
      }
      return prev;
    });
  }, [index, maxIndex, offset, initialSlideWidth, boxWidth]);
  return slideWidth;
}

export function debounce(func: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function useThrottle(func: Function, delay: number) {
  let throttling = false;
  return (...args: any[]) => {
    if (!throttling) {
      func(...args);
      throttling = true;
      setTimeout(() => {
        throttling = false;
      }, delay);
    }
  };
}

export const formatToTimeAgo = (date: string): string => {
  const now = new Date();
  const inputDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );

  if (isNaN(diffInSeconds)) {
    return "유효하지 않은 날짜입니다";
  }

  const intervals = [
    { label: "년", seconds: 31536000 },
    { label: "개월", seconds: 2592000 },
    { label: "주", seconds: 604800 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
    { label: "초", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label} 전`;
    }
  }

  return "방금 전";
};

export const getSplitMovies = (
  movies: Movie[],
  index: number,
  offset: number
) => {
  const maxIndex = movies.length;
  const maxAllowedIndex = maxIndex - offset;
  const prevMovies = !index
    ? movies.slice(maxAllowedIndex, maxIndex)
    : index < offset
    ? [...Array(offset - index).fill(0), ...movies.slice(0, index)]
    : movies.slice(index - offset, index);
  const currentMovies = movies.slice(index, index + offset);
  const nextMovies =
    index < maxAllowedIndex
      ? movies.slice(index + offset, index + 2 * offset)
      : movies.slice(0, offset);
  return [prevMovies, currentMovies, nextMovies];
};

export const useGetSplitMovies = (movies: Movie[], offset: number) => {
  return useCallback(
    (index: number) => {
      const maxIndex = movies.length;
      const maxAllowedIndex = maxIndex - offset;
      const prevMovies = !index
        ? movies.slice(maxAllowedIndex, maxIndex)
        : index < offset
        ? [...Array(offset - index).fill(0), ...movies.slice(0, index)]
        : movies.slice(index - offset, index);
      const currentMovies = movies.slice(index, index + offset);
      const nextMovies =
        index < maxAllowedIndex
          ? movies.slice(index + offset, index + 2 * offset)
          : movies.slice(0, offset);
      return [prevMovies, currentMovies, nextMovies];
    },
    [movies, offset]
  );
};

export function imagePathFormatter(url: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${url}`;
}

export function getMovieTrailer(id: number) {
  const trailerDB: { [key: string]: string } = {
    653346: "XtFI7SNtVpY",
    823464: "lV1OOlGwExM",
    929590: "c2G18nIVpNE",
    746036: "EySdVK0NK1Y",
    786892: "FVswuip0-co",
    614933: "Jokpt_LJpbw",
    882059: "tztCsUyiQv8",
    872585: "uYPbbksJxIg",
    748783: "IeFWNtMo1Fs",
    348: "GTNMt84KT0k",
    739547: "BOEMUudvYAw",
    719221: "bvDArsKoTOE",
    1087388: "B73g786Izg0",
    1093995: "kv8h9xiVVTo",
    1111873: "xtAL2x58hns",
    1096197: "e1k1PC0TtmE",
    1041613: "ewxS9Z-XXYo",
    843527: "V8i6PB0gGOA",
    937287: "DQ9cAzLMtjA",
    1284004: "MRjglxCFLmM",
  };
  const trailerId = trailerDB[id + ""];
  return trailerId ? trailerId : null;
}

export const summarizedDesc = (description: string) => {
  const index = description.indexOf(".") + 1;
  return description.substring(0, index);
};

export const getOffsetHeight = (element: React.RefObject<HTMLDivElement>) => {
  if (!element.current) return 0;
  return element.current.offsetHeight;
};
