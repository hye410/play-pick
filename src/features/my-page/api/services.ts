import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { BASE_URL } from "@/constants/path-constants";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";

export const postChangePassword = async (newPassword: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/update-password`, {
      method: API_METHOD.POST,
      headers: API_HEADER,
      body: JSON.stringify({ password: newPassword }),
    });
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.message;
  } catch (error) {
    throw error;
  }
};

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

export const getLikesData = async (likes: Array<USER_LIKES_TYPE>) => {
  try {
    const likesString = JSON.stringify(likes);
    const encodedLikes = encodeURIComponent(likesString);
    const res = await fetch(`${BASE_URL}/api/likes-list?likes=${encodedLikes}`);
    const result = await res.json();
    if (!res.ok) throw result.message;
    const { data } = result;
    return data;
  } catch (error) {
    throw error;
  }
};
