import { SURVEY_MESSAGE } from "@/constants/message-constants";
import Survey from "@/features/survey/survey";
import { createServerSupabase } from "@/utils/supabase-server";
const { FETCH_COMMON_QUESTIONS_FAIL } = SURVEY_MESSAGE;

export const revalidate = 86400;
const SurveyPage = async () => {
  const supabase = await createServerSupabase();
  const { data: initialQuestions, error } = await supabase
    .from("survey_questions")
    .select("*")
    .eq("is_common", true)
    .order("step", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(FETCH_COMMON_QUESTIONS_FAIL);
  }

  return (
    <section className="h-full">
      <Survey initialQuestions={initialQuestions} />
    </section>
  );
};

export default SurveyPage;
