import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { BASE_URL } from "@/constants/path-constants";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";

export const deleteUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/delete-user`, {
      method: API_METHOD.DELETE,
      headers: API_HEADER,
    });

    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.message;
  } catch (error) {
    throw error;
  }
};

export const getLikedContents = async (likes: Array<USER_LIKES_TYPE>) => {
  try {
    const likesString = JSON.stringify(likes);
    const encodedLikes = encodeURIComponent(likesString);
    const res = await fetch(`${BASE_URL}/api/liked-contents?likes=${encodedLikes}`);
    const result = await res.json();
    if (!res.ok) throw result.message;
    const { data } = result;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSingleContentData = async (id: CombinedData["id"], type: CombinedData["type"]) => {
  try {
    const res = await fetch(`${BASE_URL}/api/liked-contents?id=${id}&type=${type}`);
    const result = await res.json();
    if (!res.ok) throw result.message;
    const { data } = result;
    return data;
  } catch (error) {
    throw error;
  }
};
