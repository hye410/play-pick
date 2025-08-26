import { DEFAULT_YOUTUBE_SEARCH_API } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE, PREVIEW_VIDEO_MESSAGE } from "@/constants/message-constants";
import type { YOUTUBE_RESPONSE_TYPE, YOUTUBE_RESULT_TYPE } from "@/types/preview-types";
import { NextRequest, NextResponse } from "next/server";
const { CLIENT_ERROR, FETCH_ERROR, SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { UNABLE_TO_FIND_PREVIEW } = PREVIEW_VIDEO_MESSAGE;
export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const title = searchParams.get("title");
    if (!title) throw new Error(CLIENT_ERROR);
    const res = await fetch(DEFAULT_YOUTUBE_SEARCH_API(title));
    if (!res.ok) throw new Error(FETCH_ERROR);
    const data: YOUTUBE_RESPONSE_TYPE = await res.json();
    const item: YOUTUBE_RESULT_TYPE = data.items?.[0];
    if (item)
      return NextResponse.json({ data: { videoId: item.id.videoId, videoTitle: item.snippet.title } }, { status: 200 });
    throw Error(UNABLE_TO_FIND_PREVIEW);
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof Error) errorMessage = error.message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
