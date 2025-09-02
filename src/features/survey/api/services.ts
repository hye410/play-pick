import { BASE_URL } from "@/constants/path-constants";

export const getQuestions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/survey`);
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.questions;
  } catch (error) {
    throw error;
  }
};
