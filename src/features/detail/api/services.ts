import { DEFAULT_YOUTUBE_SEARCH_API } from "@/constants/api-constants";
import { A_DAY } from "@/constants/fetch-time-constants";
import { BASE_URL } from "@/constants/path-constants";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
import { PREVIEW_VIDEO_TYPE } from "@/types/preview-types";

export const getDetailContent = async (contentId: string, type: Pick<CombinedData, "type">) => {
  try {
    const res = await fetch(`${BASE_URL}/api/detail-content/${contentId}?type=${type}`, {
      next: {
        revalidate: A_DAY,
      },
    });
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getPreviewVideo = async (title: FilteredDetailData["title"]) => {
  try {
    const res = await fetch(`${BASE_URL}/api/preview-video?title=${title}`);
    const result = await res.json();
    if (!res.ok) throw result.message;
    const data: PREVIEW_VIDEO_TYPE = result.data;
    return data;
  } catch (error) {
    throw error;
  }
};
