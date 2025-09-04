import { getInitialQuestions } from "@/features/survey/api/services";
import Survey from "@/features/survey/survey";

const SurveyPage = async () => {
  const initialQuestions = await getInitialQuestions();
  return (
    <section className="h-full">
      <Survey initialQuestions={initialQuestions} />
    </section>
  );
};

export default SurveyPage;
