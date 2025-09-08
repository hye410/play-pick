import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE, RESULT_MESSAGE } from "@/constants/message-constants";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import { makeQueryParams } from "@/features/result/util/make-query-params";
import { CustomError } from "@/utils/error";
import { NextRequest, NextResponse } from "next/server";

import { filterAndNarrowData, filterMovieData, filterTvData } from "@/utils/filter-contents";
import { CombinedData, MovieData, TVData } from "@/types/contents-types";

const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { FETCH_RECOMMEND_FAIL } = RESULT_MESSAGE;
export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.json();
    const urlSearchParams = makeQueryParams(payload);
    const tmdbApiUrl = `${TMDB_BASE_URL}/discover/${payload.type}?api_key=${process.env.TMDB_API_KEY}&${urlSearchParams.toString()}`;
    const res = await fetch(tmdbApiUrl, {
      method: API_METHOD.GET,
      headers: TMDB_API_HEADER,
    });
    const result = await res.json();
    if (!res.ok) throw new CustomError(FETCH_RECOMMEND_FAIL);

    let recommends: CombinedData[] = [];
    if (payload.type === "movie") {
      const filteredResults = filterAndNarrowData(result.results as MovieData[]);
      recommends = filterMovieData(filteredResults);
    } else {
      const filteredResults = filterAndNarrowData(result.results as TVData[]);
      recommends = filterTvData(filteredResults);
    }

    return NextResponse.json({ recommends }, { status: 200 });
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
