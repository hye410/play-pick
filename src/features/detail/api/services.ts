import { BASE_URL } from "@/constants/path-constants";
import type { FilteredDetailData } from "@/types/contents-types";
import type { PREVIEW_VIDEO_TYPE } from "@/types/preview-types";

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
