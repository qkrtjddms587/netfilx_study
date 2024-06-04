import { useGetMovies } from "../../api";
import SliderContainer from "../slider/SliderContainer";
import Banner from "../banner/Banner";
import Loading from "../molecules/Loading";

export default function MainPage() {
  const { movies, category, isLoading } = useGetMovies(0);
  const titleIndex = 1;
  const titleMovie = movies[titleIndex];
  const modifiedMovies = movies.filter((_, i) => i !== titleIndex);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner titleMovie={titleMovie} />
          <SliderContainer movies={modifiedMovies} category={category} />
        </>
      )}
    </>
  );
}
