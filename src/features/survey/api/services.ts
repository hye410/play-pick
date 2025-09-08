import { A_DAY } from "@/constants/fetch-time-constants";
import { BASE_URL } from "@/constants/path-constants";

export const getInitialQuestions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/survey`, {
      next: {
        revalidate: A_DAY,
      },
    });
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.questions;
  } catch (error) {
    throw error;
  }
};
export const getQuestionsByKey = async (preferredType: unknown) => {
  try {
    const res = await fetch(`${BASE_URL}/api/survey?separated_key=${preferredType}`);
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.questions;
  } catch (error) {
    throw error;
  }
};
