"use server";

import type { Answer } from "@/types/survey-types";
import type { CombinedData, MovieData, TMDBResponse, TVData } from "@/types/contents-types";
import { makeQueryParams } from "@/features/result/util/make-query-params";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { RESULT_MESSAGE } from "@/constants/message-constants";
import { filterAndNarrowData, filterMovieData, filterTvData } from "@/utils/filter-contents";
import type { ResultState } from "@/types/server-action-return-type";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const { FETCH_RECOMMENDS_FAIL } = RESULT_MESSAGE;
export const getSurveyResult = async (payload: Answer, page: number = 1): Promise<ResultState> => {
  const urlSearchParams = makeQueryParams(payload);
  const tmdbApiUrl = `${TMDB_BASE_URL}/discover/${payload.type}?api_key=${TMDB_API_KEY}&page=${page}&${urlSearchParams.toString()}`;
  const res = await fetch(tmdbApiUrl, {
    method: API_METHOD.GET,
    headers: TMDB_API_HEADER,
  });
  const result: TMDBResponse<MovieData | TVData> = await res.json();
  if (!res.ok) return { success: false, message: FETCH_RECOMMENDS_FAIL, recommends: [], totalPages: 0 };

  let recommends: CombinedData[] = [];
  if (payload.type === "movie") {
    const filteredResults = filterAndNarrowData(result.results as MovieData[]);
    recommends = filterMovieData(filteredResults);
  } else {
    const filteredResults = filterAndNarrowData(result.results as TVData[]);
    recommends = filterTvData(filteredResults);
  }

  return { success: true, recommends: recommends, message: null, totalPages: result.total_pages };
};
