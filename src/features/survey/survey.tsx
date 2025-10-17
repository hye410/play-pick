"use client";
import AnimatedComponent from "@/components/animated-component";
import useSurvey from "@/features/survey/hook/use-survey";
import Options from "@/features/survey/options";
import type { Question } from "@/types/survey-types";
import MotionButtons from "@/features/survey/motion-buttons";

type SurveyProps = {
  initialQuestions: Array<Question>;
};

const APPLY_GRID_BOUNDARY = 12;

const Survey = ({ initialQuestions }: SurveyProps) => {
  const { currentQuestion, currentOptions, getOptionValues, currentKey, direction } = useSurvey(initialQuestions);

  return (
    <div className="relative mx-auto flex h-full w-[80%] flex-col items-center justify-center">
      <AnimatedComponent direction={direction} animatedKey={currentKey}>
        <h3 className="mb-6 text-center text-lg font-bold">{currentQuestion.question}</h3>
        <Options
          options={currentOptions}
          handleSelectOptions={getOptionValues}
          haveManyOptions={currentOptions.length >= APPLY_GRID_BOUNDARY}
          currentKey={currentKey}
        />
      </AnimatedComponent>
      <MotionButtons initialQuestions={initialQuestions} />
    </div>
  );
};

export default Survey;
