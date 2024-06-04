import { useGetMovies } from "../../api";
import SliderContainer from "../slider/SliderContainer";
import Loading from "../molecules/Loading";

interface SliderProps {
  index: number;
}

export default function Slider({ index }: SliderProps) {
  const { movies, category, isLoading } = useGetMovies(index);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SliderContainer movies={movies} category={category} />
      )}
    </>
  );
}
