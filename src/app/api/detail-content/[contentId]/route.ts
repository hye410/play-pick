import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import type { CombinedDetailData, DetailMovieData, DetailTVData, FilteredDetailData } from "@/types/contents-types";
import { NextRequest, NextResponse } from "next/server";

type DetailContentParams = {
  params: Promise<{
    contentId: string;
  }>;
};

const { SERVER_ERROR, FETCH_ERROR } = DEFAULT_ERROR_MESSAGE;

const filterMovieData = (data: DetailMovieData & CombinedDetailData): FilteredDetailData => {
  return {
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

const filterTvData = (data: DetailTVData & CombinedDetailData): FilteredDetailData => {
  return {
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

export const GET = async (request: NextRequest, { params }: DetailContentParams) => {
  try {
    const type = request.nextUrl.searchParams.get("type");
    const { contentId } = await params;

    const options = {
      method: API_METHOD.GET,
      headers: TMDB_API_HEADER,
    };
    const res = await fetch(`${TMDB_BASE_URL}/${type}/${contentId}?language=ko-KR&page=1`, options);
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ message: FETCH_ERROR }, { status: 500 });
    const parsedData = type === "movie" ? filterMovieData(data) : filterTvData(data);
    return NextResponse.json({ data: parsedData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
