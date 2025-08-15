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
};

export type TVData = {
  id: number;
  adult: boolean;
  poster_path: string | null;
  original_name: string;
};

export type CombinedData = {
  id: number;
  title: string;
  imgUrl: string;
};
