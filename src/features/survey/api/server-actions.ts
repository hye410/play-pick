"use server";

import { SURVEY_DB } from "@/constants/db-constants";
import { SURVEY_MESSAGE } from "@/constants/message-constants";
import type { SurveyState } from "@/types/server-action-return-type";
import { createServerSupabase } from "@/utils/supabase-server";
const { FETCH_ADDED_QUESTIONS_FAIL } = SURVEY_MESSAGE;
const { survey, separatedKey } = SURVEY_DB;
export const getAdditionalQuestions = async (selectedType: "tv" | "movie"): Promise<SurveyState> => {
  const supabase = await createServerSupabase();
  const { data: questions, error } = await supabase.from(survey).select("*").eq(separatedKey, selectedType);
  if (error) {
    console.error(error);
    return { success: false, message: FETCH_ADDED_QUESTIONS_FAIL, questions: [] };
  }
  return { success: true, message: null, questions };
};
