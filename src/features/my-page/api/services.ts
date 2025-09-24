import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { BASE_URL } from "@/constants/path-constants";

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
