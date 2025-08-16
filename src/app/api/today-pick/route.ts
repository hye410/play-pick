import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE, TODAY_PICK_ERROR_MESSAGE } from "@/constants/message-constants";
import { GET_TODAY_PICK } from "@/constants/path-constants";
import type { CombinedData, MovieData, TMDBResponse, TVData } from "@/types/contents-type";
import { NextResponse } from "next/server";

const { SERVER_ERROR, FETCH_ERROR } = DEFAULT_ERROR_MESSAGE;
const { FETCH_MOVIE_ERROR, FETCH_TV_ERROR } = TODAY_PICK_ERROR_MESSAGE;

/**
 * Today's Pick에 필요한 데이터만 정제해 주는 함수
 * @param dataToFilter 필터링할 데이터 배열
 * @returns 필터링된 데이터(성인물이 아니고 post_image가 존재하는 데이터)
 */
const filterAndNarrowData = <T extends { poster_path: string | null; adult: boolean }>(
  dataToFilter: T[],
): Array<Omit<T, "poster_path"> & { poster_path: string }> => {
  return dataToFilter.filter((data): data is T & { poster_path: string } => {
    return !data.adult && data.poster_path !== null;
  });
};

export const GET = async () => {
  try {
    const options = {
      method: API_METHOD.GET,
      headers: TMDB_API_HEADER,
    };

    const [movieRes, tvRes] = await Promise.all([
      fetch(GET_TODAY_PICK("movie"), options),
      fetch(GET_TODAY_PICK("tv"), options),
    ]);

    const fetchMovieData = async (): Promise<CombinedData[]> => {
      const movieData: TMDBResponse<MovieData> = await movieRes.json();
      if (!movieRes.ok) {
        console.error(FETCH_MOVIE_ERROR);
        throw new Error(FETCH_ERROR, {
          cause: { message: movieData.status_message, code: 400 },
        });
      }
      const filteredMovies = filterAndNarrowData(movieData.results);
      return filteredMovies
        .map((data) => ({
          id: data.id,
          title: data.original_title,
          imgUrl: data.poster_path,
        }))
        .slice(0, 15);
    };

    const fetchTVData = async (): Promise<CombinedData[]> => {
      const tvData: TMDBResponse<TVData> = await tvRes.json();
      if (!tvRes.ok) {
        console.error(FETCH_TV_ERROR);
        throw new Error(FETCH_ERROR, { cause: { message: tvData.status_message, code: 400 } });
      }

      const filteredTVShows = filterAndNarrowData(tvData.results);

      return filteredTVShows
        .map((data) => ({
          id: data.id,
          title: data.original_name,
          imgUrl: data.poster_path,
        }))
        .slice(0, 15);
    };

    const [movies, tvShows] = await Promise.all([fetchMovieData(), fetchTVData()]);

    const data: CombinedData[] = [...movies, ...tvShows];
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    let errorStatus = 500;
    if (error instanceof Error && error.cause) {
      errorMessage = error.message;
      errorStatus = 400;
    }
    return NextResponse.json({ message: errorMessage }, { status: errorStatus });
  }
};
