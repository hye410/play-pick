import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { BASE_URL } from "@/constants/path-constants";
import type { Answer } from "@/types/survey-types";

export const getSurveyResult = async (payload: Answer) => {
  try {
    const res = await fetch(`${BASE_URL}/api/result`, {
      method: API_METHOD.POST,
      headers: API_HEADER,
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.recommends;
  } catch (error) {
    throw error;
  }
};
