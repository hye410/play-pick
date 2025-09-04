import { API_HEADER, API_METHOD } from "@/constants/api-constants";
import { BASE_URL } from "@/constants/path-constants";
import type { Answer, Question } from "@/types/survey-types";

export const getInitialQuestions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/survey`);
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.questions;
  } catch (error) {
    throw error;
  }
};
export const getQuestionsByKey = async (preferredType: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/survey?separated_key=${preferredType}`);
    const result = await res.json();
    if (!res.ok) throw result.message;
    return result.questions;
  } catch (error) {
    throw error;
  }
};

export const getSurveyResult = async (payload: Answer, questions: Question[]) => {
  try {
    const parsedQuestions = questions.map((question) => ({
      tmdbKey: question.tmdb_key,
      options: question.options,
    }));
    const res = await fetch(`${BASE_URL}/api/result`, {
      method: API_METHOD.POST,
      headers: API_HEADER,
      body: JSON.stringify({ payload, questions: parsedQuestions }),
    });
    console.log("res=>", res);
    const result = await res.json();
    console.log("result=>", result);
  } catch (error) {
    throw error;
  }
};
