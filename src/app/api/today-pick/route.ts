import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE, TODAY_PICK_MESSAGE } from "@/constants/message-constants";
import { GET_TODAY_PICK } from "@/constants/path-constants";
import type { CombinedData, MovieData, TMDBResponse, TVData } from "@/types/contents-types";
import { filterAndNarrowData, filterMovieData, filterTvData } from "@/utils/filter-contents";
import { NextResponse } from "next/server";

const { SERVER_ERROR, FETCH_ERROR } = DEFAULT_ERROR_MESSAGE;
const { FETCH_MOVIE_ERROR, FETCH_TV_ERROR } = TODAY_PICK_MESSAGE;

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
      return filterMovieData(filteredMovies).slice(0, 15);
    };

    const fetchTVData = async (): Promise<CombinedData[]> => {
      const tvData: TMDBResponse<TVData> = await tvRes.json();
      if (!tvRes.ok) {
        console.error(FETCH_TV_ERROR);
        throw new Error(FETCH_ERROR, { cause: { message: tvData.status_message, code: 400 } });
      }

      const filteredTVShows = filterAndNarrowData(tvData.results);

      return filterTvData(filteredTVShows).slice(0, 15);
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
