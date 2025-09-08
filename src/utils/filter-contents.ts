import type { CombinedData, MovieData, TVData } from "@/types/contents-types";

/**
 * Today's Pick에 필요한 데이터만 정제해 주는 함수
 * @param dataToFilter 필터링할 데이터 배열
 * @returns 필터링된 데이터(성인물이 아니고 post_image가 존재하는 데이터)
 */
export const filterAndNarrowData = <T extends { poster_path: string | null; adult: boolean }>(
  dataToFilter: T[],
): Array<Omit<T, "poster_path"> & { poster_path: string }> => {
  return dataToFilter.filter((data): data is T & { poster_path: string } => {
    return !data.adult && data.poster_path !== null;
  });
};

export const filterMovieData = (
  data: Array<Omit<MovieData, "poster_path"> & { poster_path: string }>,
): CombinedData[] => {
  return data.map((data) => ({
    id: data.id,
    title: data.original_title,
    imgUrl: data.poster_path,
    type: data.media_type ?? "movie",
  }));
};

export const filterTvData = (data: Array<Omit<TVData, "poster_path"> & { poster_path: string }>): CombinedData[] => {
  return data.map((data) => ({
    id: data.id,
    title: data.original_name,
    imgUrl: data.poster_path,
    type: data.media_type ?? "tv",
  }));
};
