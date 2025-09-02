import { getQuestions } from "@/features/survey/api/services";
import Survey from "@/features/survey/survey";

const SurveyPage = async () => {
  const questions = await getQuestions();

  return (
    <section className="h-full">
      <Survey questions={questions} />
    </section>
  );
};

export default SurveyPage;
