import { API_METHOD } from "@/constants/api-constants";
import { A_DAY } from "@/constants/fetch-time-constants";
import { BASE_URL } from "@/constants/path-constants";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
import type { PREVIEW_VIDEO_TYPE } from "@/types/preview-types";
import type { User } from "@/types/user-types";

export const getDetailContent = async (contentId: CombinedData["id"], type: CombinedData["type"]) => {
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

export const getUserLikes = async (userId: User["id"]) => {
  try {
    const res = await fetch(`${BASE_URL}/api/likes?userId=${userId}`, {
      cache: "no-store",
    });
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.data;
  } catch (error) {
    throw error;
  }
};

type Payload = {
  contentId: CombinedData["id"];
  contentType: CombinedData["type"];
  userId: User["id"];
};
export const postUserLikesStatus = async (payload: Payload) => {
  try {
    const res = await fetch(`${BASE_URL}/api/likes`, {
      method: API_METHOD.POST,
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.message;
  } catch (error) {
    throw error;
  }
};

export const deleteUserLikesStatus = async (userId: User["id"], contentId: CombinedData["id"]) => {
  try {
    const res = await fetch(`${BASE_URL}/api/likes?userId=${userId}&contentId=${contentId}`, {
      method: API_METHOD.DELETE,
    });
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.message;
  } catch (error) {
    throw error;
  }
};
