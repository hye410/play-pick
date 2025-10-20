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
  title: string;
  media_type: "movie";
};

export type TVData = {
  id: number;
  adult: boolean;
  poster_path: string | null;
  original_name: string;
  name: string;
  media_type: "tv";
};

export type CombinedData = {
  id: number;
  title: string;
  titleKR?: string;
  imgUrl: string;
  type: "movie" | "tv";
};

export type CombinedDetailData = {
  id: number;
  poster_path: string;
  overview: string;
  vote_average: number;
  genres: { name: string }[];
};

export type DetailMovieData = {
  title: string;
  original_title: string;
  runtime: number;
  release_date: string;
  type: "movie";
};

export type DetailTVData = {
  name: string;
  original_name: string;
  last_air_date: string;
  last_episode_to_air: { air_date: string };
  seasons: Array<{ air_date: string }>;
};

export type FilteredDetailData = {
  id: number;
  title: string;
  originalTitle: string;
  imgUrl: string;
  type: "movie" | "tv";
  runtime?: number;
  overview: string;
  releaseDate?: string;
  lastAirDate?: string;
  rating: number;
  genres: string;
};
