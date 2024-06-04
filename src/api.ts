import { useEffect, useState } from "react";

const BASE_PATH = "https://api.themoviedb.org/3/";
const API_KEY = "9c86b7d05f51a90836cabc185559b002";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GetMoviesResult {
  dates: {
    maximum: string;
    minimun: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export function useGetMovies(index: number) {
  const category = [
    { title: "현재 상영 중인 콘텐츠", url: "now_playing" },
    { title: "인기 콘텐츠", url: "popular" },
    { title: "Top 10 콘텐츠", url: "top_rated" },
    { title: "최신 컨텐츠", url: "upcoming" },
  ];
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(
          `${BASE_PATH}/movie/${category[index].url}?api_key=${API_KEY}`
        )
      ).json();
      setMovies(response.results);
      setIsloading(false);
    })();
  }, []);
  return { movies, isLoading, category: category[index].title };
}
