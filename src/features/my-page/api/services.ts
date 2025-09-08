import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { BASE_URL } from "@/constants/path-constants";

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
