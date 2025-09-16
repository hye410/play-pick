import type { CombinedData, MovieData, TMDBResponse, TVData } from "@/types/contents-types";
import { CustomError } from "@/utils/error";
import { filterAndNarrowData, filterMovieData, filterTvData } from "@/utils/filter-contents";
import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { A_DAY } from "@/constants/fetch-time-constants";
import { DEFAULT_ERROR_MESSAGE, TODAY_PICK_MESSAGE } from "@/constants/message-constants";
import { GET_TODAY_PICK } from "@/constants/path-constants";
const { SERVER_ERROR, FETCH_ERROR } = DEFAULT_ERROR_MESSAGE;
const { FETCH_MOVIE_ERROR, FETCH_TV_ERROR } = TODAY_PICK_MESSAGE;

/**
 * 홈 화면 Today's Pick 데이터를 요청하는 함수
 */
export const getTodayPick = async () => {
  try {
    const option = {
      method: API_METHOD.GET,
      headers: TMDB_API_HEADER,
      next: {
        revalidate: A_DAY,
      },
    };

    const [movieRes, tvRes] = await Promise.all([
      fetch(GET_TODAY_PICK("movie"), option),
      fetch(GET_TODAY_PICK("tv"), option),
    ]);

    const fetchMovieData = async (): Promise<CombinedData[]> => {
      const movieData: TMDBResponse<MovieData> = await movieRes.json();
      if (!movieRes.ok) {
        console.error(`[${FETCH_MOVIE_ERROR}] => 원인 : ${movieRes.statusText}`);
        return [];
      }
      const filteredMovies = filterAndNarrowData(movieData.results.slice(0, 15));
      return filterMovieData(filteredMovies);
    };

    const fetchTVData = async (): Promise<CombinedData[]> => {
      const tvData: TMDBResponse<TVData> = await tvRes.json();
      if (!tvRes.ok) {
        console.error(`[${FETCH_TV_ERROR}] => 원인 : ${tvRes.statusText}`);
        return [];
      }
      const filteredTVShows = filterAndNarrowData(tvData.results.slice(0, 15));
      return filterTvData(filteredTVShows);
    };

    const [movies, tvShows] = await Promise.all([fetchMovieData(), fetchTVData()]);

    const data: CombinedData[] = [...movies, ...tvShows];

    if (data.length === 0) throw new CustomError(FETCH_ERROR);

    return data;
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    throw new Error(errorMessage);
  }
};
