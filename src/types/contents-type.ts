export type TMDBResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  status_code?: number;
  status_message?: string;
};

export type MovieData = {
  id: number;
  adult: boolean;
  poster_path: string | null;
  original_title: string;
  media_type: "movie";
};

export type TVData = {
  id: number;
  adult: boolean;
  poster_path: string | null;
  original_name: string;
  media_type: "tv";
};

export type CombinedData = {
  id: number;
  title: string;
  imgUrl: string;
  type: "movie" | "tv";
};

export type DetailMovieData = {
  title: string;
  original_title: string;
  runtime: string;
  release_date: string;
  type: "movie";
};

export type DetailTVData = {
  name: string;
  original_name: string;
  episode_run_time: string[];
  first_air_date: string;
  type: "tv";
};

export type DetailCombinedData = {
  poster_path: string;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
};

export type DetailContentData = {
  title: string;
  originalTitle: string;
  imgUrl: string;
  overview: string;
  runtime: string;
  releaseDate: string;
  rating: number;
  genres: string;
  type: "movie" | "tv";
};
