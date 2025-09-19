import type { CombinedDetailData, DetailMovieData, DetailTVData, FilteredDetailData } from "@/types/contents-types";

export const filterDetailMovieData = (data: DetailMovieData & CombinedDetailData): FilteredDetailData => {
  return {
    id: data.id,
    title: data.title,
    originalTitle: data.original_title,
    imgUrl: data.poster_path,
    type: "movie",
    overview: data.overview,
    runtime: data.runtime,
    releaseDate: data.release_date,
    rating: data.vote_average,
    genres: data.genres.map(({ name }) => name).join(" / "),
  };
};

export const filterDetailTvData = (data: DetailTVData & CombinedDetailData): FilteredDetailData => {
  return {
    id: data.id,
    title: data.name,
    originalTitle: data.original_name,
    imgUrl: data.poster_path,
    type: "tv",
    overview: data.overview,
    lastAirDate: data.last_air_date,
    rating: data.vote_average,
    genres: data.genres.map(({ name }) => name).join(" / "),
  };
};
