import { SURVEY_DB } from "@/constants/db-constants";
import { SURVEY_MESSAGE } from "@/constants/message-constants";
import Survey from "@/features/survey/survey";
import { createServerSupabase } from "@/utils/supabase-server";
import { Metadata } from "next";
const { FETCH_COMMON_QUESTIONS_FAIL } = SURVEY_MESSAGE;
const { survey, isCommon, step } = SURVEY_DB;
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Play Pick - 내 취향 콘텐츠 찾기 🎬",
  description: "몇 가지 질문으로 당신에게 꼭 맞는 작품을 추천해 드릴게요.",
  icons: {
    icon: "/favicon.ico",
  },
};

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
    <section className="h-full max-h-fit">
      <Survey initialQuestions={initialQuestions} />
    </section>
  );
};

export default SurveyPage;
