import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE, MY_CONTENTS_MESSAGE } from "@/constants/message-constants";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { CustomError } from "@/utils/error";
import { NextRequest, NextResponse } from "next/server";
const apiKey = process.env.TMDB_API_KEY;
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { PAYLOAD_FAIL } = MY_CONTENTS_MESSAGE;
export const GET = async (request: NextRequest) => {
  try {
    const likes = request.nextUrl.searchParams.get("likes");
    if (!likes) throw new CustomError(PAYLOAD_FAIL);
    const decodedLikes = decodeURIComponent(likes);
    const userLikes: Array<USER_LIKES_TYPE> = JSON.parse(decodedLikes);
    const fetchUserLikesData = userLikes.map(async (userLike) => {
      const { id, type } = userLike;
      const url = `${TMDB_BASE_URL}/${type}/${id}?api_key=${apiKey}&language=ko-KR`;
      try {
        const res = await fetch(url, {
          method: API_METHOD.GET,
          headers: TMDB_API_HEADER,
        });
        if (!res.ok) {
          console.error(`ID${id} 콘텐츠 가져오기 실패`);
          return null;
        }
        return res.json();
      } catch (error) {
        console.error(`ID ${id} 콘텐츠 가져오기 오류 발생`, error);
        return null;
      }
    });
    const allContents = await Promise.all(fetchUserLikesData);
    const validContents = allContents.filter((content) => content !== null);
    const parsedData: Array<CombinedData> = validContents.map((content) => ({
      id: content.id,
      type: content.release_date ? "movie" : "tv",
      imgUrl: content.poster_path,
      title: content.title || content.name,
    }));
    return NextResponse.json({ data: parsedData }, { status: 200 });
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
