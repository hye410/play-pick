import { CONTENTS_TYPE } from "@/constants/contents-constants";

const { MOVIE, TV } = CONTENTS_TYPE;
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
  media_type: typeof MOVIE;
};

export type TVData = {
  id: number;
  adult: boolean;
  poster_path: string | null;
  original_name: string;
  media_type: typeof TV;
};

export type CombinedData = {
  id: number;
  title: string;
  imgUrl: string;
  type: typeof MOVIE | typeof TV;
};

export type CombinedDetailData = {
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
  type: typeof MOVIE;
};

export type DetailTVData = {
  name: string;
  original_name: string;
  last_air_date: string;
};

export type FilteredDetailData = {
  title: string;
  originalTitle: string;
  imgUrl: string;
  type: typeof TV | typeof MOVIE;
  runtime?: number;
  overview: string;
  releaseDate?: string;
  lastAirDate?: string;
  rating: number;
  genres: string;
};
