import { SURVEY_DB } from "@/constants/db-constants";
import { SURVEY_MESSAGE } from "@/constants/message-constants";
import Survey from "@/features/survey/survey";
import { createServerSupabase } from "@/utils/supabase-server";
const { FETCH_COMMON_QUESTIONS_FAIL } = SURVEY_MESSAGE;
const { survey, isCommon, step } = SURVEY_DB;
export const revalidate = 86400;

const HEADER_SIZE = "6.25rem";
const SurveyPage = async () => {
  const supabase = await createServerSupabase();
  const { data: initialQuestions, error } = await supabase
    .from(survey)
    .select("*")
    .eq(isCommon, true)
    .order(step, { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(FETCH_COMMON_QUESTIONS_FAIL);
  }

  return (
    <section className={`h-[calc(100dvh-${HEADER_SIZE})]`}>
      <Survey initialQuestions={initialQuestions} />
    </section>
  );
};

export default SurveyPage;
