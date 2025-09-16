"use client";
import Button from "@/components/button";
import Options from "@/features/survey/options";
import type { Question } from "@/types/survey-types";
import clsx from "clsx";
import useSurveyHook from "@/features/survey/hook/use-survey-hook";

type SurveyProps = {
  initialQuestions: Question[];
};

const APPLY_GRID_BOUNDARY = 12;

const Survey = ({ initialQuestions: initialQuestion }: SurveyProps) => {
  const {
    currentQuestion,
    currentOptions,
    getOptionValue,
    currentKey,
    isFirstQuestion,
    isLastQuestion,
    moveToNext,
    moveToPrev,
    answers,
  } = useSurveyHook(initialQuestion);

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <h3 className="mb-6 text-lg font-bold">{currentQuestion.question}</h3>
      <Options
        options={currentOptions}
        handleSelectOption={getOptionValue}
        haveManyOptions={currentOptions.length >= APPLY_GRID_BOUNDARY}
        currentKey={currentKey}
      />
      <div
        className={clsx(
          "mx-auto flex w-[80%] items-center gap-16",
          isFirstQuestion && "justify-end",
          !isFirstQuestion && "justify-between",
        )}
      >
        {!isFirstQuestion && (
          <div>
            <Button onClick={moveToPrev} color="secondary" size="small">
              이전
            </Button>
          </div>
        )}
        <div>
          <Button onClick={moveToNext} size="small" disabled={!answers[currentKey]}>
            {isLastQuestion ? "결과" : "다음"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
