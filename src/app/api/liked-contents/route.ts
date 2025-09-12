import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE, MY_CONTENTS_MESSAGE } from "@/constants/message-constants";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { CustomError } from "@/utils/error";
import { NextRequest, NextResponse } from "next/server";
const apiKey = process.env.TMDB_API_KEY;
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { PAYLOAD_FAIL, UNKNOWN_CONTENT_TYPE, NO_CONTENT_DATA } = MY_CONTENTS_MESSAGE;

const fetchTmdbContent = async (id: number, type: string) => {
  const url = `${TMDB_BASE_URL}/${type}/${id}?api_key=${apiKey}&language=ko-KR`;
  try {
    const res = await fetch(url, {
      method: API_METHOD.GET,
      headers: TMDB_API_HEADER,
    });
    if (!res.ok) {
      console.error(`ID ${id} 콘텐츠 가져오기 실패`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`ID ${id} 콘텐츠 가져오기 오류 발생`, error);
    return null;
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const likes = request.nextUrl.searchParams.get("likes");
    const contentId = request.nextUrl.searchParams.get("id");

    if (contentId) {
      const contentType = request.nextUrl.searchParams.get("type");
      if (!contentType) throw new CustomError(UNKNOWN_CONTENT_TYPE);
      const content = await fetchTmdbContent(Number(contentId), contentType);
      if (!content) throw new CustomError(NO_CONTENT_DATA);
      const filteredData = {
        id: content.id,
        type: content.release_date ? "movie" : "tv",
        imgUrl: content.poster_path,
        title: content.title || content.name,
      };
      return NextResponse.json({ data: filteredData }, { status: 200 });
    } else if (likes) {
      if (!likes) throw new CustomError(PAYLOAD_FAIL);
      const decodedLikes = decodeURIComponent(likes);
      const userLikes: Array<USER_LIKES_TYPE> = JSON.parse(decodedLikes);
      const fetchUserLikesData = userLikes.map(({ id, type }) => fetchTmdbContent(id, type));
      const allContents = await Promise.all(fetchUserLikesData);
      const validContents = allContents.filter((content) => content !== null);
      const parsedData: Array<CombinedData> = validContents.map((content) => ({
        id: content.id,
        type: content.release_date ? "movie" : "tv",
        imgUrl: content.poster_path,
        title: content.title || content.name,
      }));
      return NextResponse.json({ data: parsedData }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
